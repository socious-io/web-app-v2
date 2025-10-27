import React, { Dispatch, SetStateAction } from 'react';
import { ApplicantsRes } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { EmptyState } from 'src/modules/general/components/EmptyState';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import Slider from 'src/modules/general/components/Slider';
import { OrgOfferModal } from 'src/modules/Jobs/containers/OrgOfferModal';
import variables from 'src/styles/constants/_exports.module.scss';

import { ApplicantDetails } from './applicant';
import { useApplicantAction } from './useApplicantAction';

interface CardsProps {
  applicants: ApplicantsRes;
  currentTab: string;
  onRefetch: Dispatch<SetStateAction<boolean>>;
  jobId: string;
}

export const Cards: React.FC<CardsProps> = ({ applicants, currentTab, onRefetch, jobId }) => {
  const {
    open,
    setOpen,
    applicant,
    openAlert,
    setOpenAlert,
    handleReject,
    offer,
    setOffer,
    onClickName,
    onReject,
    onOffer,
    onMessage,
    onSuccess,
    handleCloseSuccess,
    success,
    applicantsList,
    page,
    handleChangePage,
    PER_PAGE,
    total,
  } = useApplicantAction(jobId, applicants, currentTab, onRefetch);
  return applicantsList.length ? (
    <div className="flex flex-col gap-4 px-4 md:hidden">
      {applicantsList.map(applicant => (
        <div key={applicant.id} className="border border-solid border-Gray-light-mode-200 rounded-lg">
          <div
            className="flex flex-row justify-start items-center gap-2 p-4 cursor-pointer"
            onClick={() => onClickName(applicant.user.id, applicant.id)}
          >
            <Avatar size="40px" type="users" img={applicant.user.avatar?.url} />
            <div className="flex flex-col justify-start">
              {/* FIXME: create a name based on firstname and lastname */}
              <p className="text-Gray-light-mode-900 leading-6 font-medium">{applicant.user.first_name}</p>
              <p className="text-Gray-light-mode-600 text-sm leading-5">
                {toRelativeTime(applicant.created_at.toString())}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-1 p-4">
            <Icon name="marker-pin-01" fontSize={20} color={variables.color_grey_600} />
            <p className="text-Gray-light-mode-600 font-medium leading-5 text-sm">{`${applicant.user.city}, ${applicant.user.country}`}</p>
          </div>
          <div className="flex flex-row border-Gray-light-mode-200 border-solid border-b-0 border-t-1 border-l-0 border-r-0">
            <div
              className={`${
                currentTab === 'applicants' ? 'w-1/3' : 'w-1/2'
              } border-Gray-light-mode-200 border-solid border-b-0 border-t-0 border-l-0 border-r text-center`}
              onClick={() => onMessage(applicant.id)}
            >
              <p className="py-2.5 px-4 text-Gray-light-mode-700 font-semibold leading-5 text-sm cursor-pointer">
                Message
              </p>
            </div>

            {currentTab === 'applicants' && (
              <div
                className="w-1/3 border-Gray-light-mode-200 border-solid border-b-0 border-t-0 border-l-0 border-r text-center"
                onClick={() => onReject(applicant.id)}
              >
                <p className="py-2.5 px-4 text-Gray-light-mode-700 font-semibold leading-5 text-sm cursor-pointer">
                  Reject
                </p>
              </div>
            )}

            <div
              className={`${currentTab === 'applicants' ? 'w-1/3' : 'w-1/2'} text-center`}
              onClick={() => onOffer(applicant.id)}
            >
              <p className="py-2.5 px-4 text-Brand-700 font-semibold leading-5 text-sm cursor-pointer">
                {currentTab === 'offered' ? 'Re-hire' : 'Hire'}
              </p>
            </div>
          </div>
        </div>
      ))}
      {applicantsList.length > 0 && (
        <div className="mt-2 px-4 pt-4 border border-solid border-x-0 border-b-0 border-t-Gray-light-mode-200">
          <PaginationMobile page={page} count={Math.ceil(total / PER_PAGE)} handleChange={handleChangePage} />
        </div>
      )}
      <Slider open={open} onClose={() => setOpen(false)}>
        <ApplicantDetails
          applicant={applicant}
          openOffer={() => setOffer(true)}
          openReject={() => setOpenAlert(true)}
          closeDetails={() => setOpen(false)}
        />
      </Slider>
      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onSubmit={handleReject}
        message="Are you sure you want to reject this application? This action cannot be undone."
        title="Reject application"
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="error"
        submitButtonLabel="Reject"
      />
      {offer && (
        <OrgOfferModal onClose={() => setOffer(false)} open={offer} applicant={applicant} onSuccess={onSuccess} />
      )}
      {success && (
        <AlertModal
          open={success}
          onClose={handleCloseSuccess}
          //FIXME: create a name based on firstname and lastname */
          message={`Congratulations! You have successfully sent an offer to ${applicant.user.first_name}`}
          title="Offer sent"
          customIcon={<FeaturedIcon iconName="check-circle" size="md" theme="success" type="light-circle-outlined" />}
          closeButtn={true}
          closeButtonLabel="Close"
          submitButton={false}
        />
      )}
    </div>
  ) : (
    <div className="block px-4 md:hidden">
      <EmptyState
        icon={<Icon name="users-01" fontSize={24} color={variables.color_grey_700} />}
        message={`No ${currentTab} yet`}
      />
    </div>
  );
};
