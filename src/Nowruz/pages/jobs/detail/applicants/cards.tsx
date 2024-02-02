import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Applicant } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { EmptyState } from 'src/Nowruz/modules/general/components/EmptyState';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Overlay } from 'src/Nowruz/modules/general/components/slideoutMenu';
import { OrgOfferModal } from 'src/Nowruz/modules/Jobs/containers/OrgOfferModal';

import { ApplicantDetails } from './applicant';
import { useApplicantAction } from './useApplicantAction';

interface CardsProps {
  applicants: Array<Applicant>;
}

export const Cards: React.FC<CardsProps> = ({ applicants }) => {
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
    onSuccess,
    handleCloseSuccess,
    success,
  } = useApplicantAction(applicants);
  return applicants.length ? (
    <div className="flex flex-col gap-4">
      {applicants.map((applicant) => (
        <div key={applicant.id} className="border border-solid border-Gray-light-mode-200 rounded-lg">
          <div
            className="flex flex-row justify-start items-center gap-2 p-4 cursor-pointer"
            onClick={() => onClickName(applicant.user.id)}
          >
            <Avatar size="40px" type="users" img={applicant.user.avatar} />
            <div className="flex flex-col justify-start">
              <p className="text-Gray-light-mode-900 leading-6 font-medium">{applicant.user?.name ?? ''}</p>
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
              className="w-1/2 border-Gray-light-mode-200 border-solid border-b-0 border-t-0 border-l-0 border-r text-center"
              onClick={() => onReject(applicant.id)}
            >
              <p className="py-2.5 px-4 text-Gray-light-mode-700 font-semibold leading-5 text-sm cursor-pointer">
                Reject
              </p>
            </div>
            <div className="w-1/2 text-center" onClick={() => onOffer(applicant.id)}>
              <p className="py-2.5 px-4 text-Gray-light-mode-700 font-semibold leading-5 text-sm cursor-pointer">
                Hire
              </p>
            </div>
          </div>
        </div>
      ))}
      <Overlay open={open} onClose={() => setOpen(false)}>
        <ApplicantDetails
          applicant={applicant}
          openOffer={() => setOffer(true)}
          openReject={() => setOpenAlert(true)}
          closeDetails={() => setOpen(false)}
        />
      </Overlay>
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
          message={`Congratulations! You have successfully sent an offer to ${applicant.user.name}`}
          title="Offer sent"
          customIcon={<FeaturedIcon iconName="check-circle" size="md" theme="success" type="light-circle-outlined" />}
          closeButtn={true}
          closeButtonLabel="Close"
          submitButton={false}
        />
      )}
    </div>
  ) : (
    <EmptyState
      icon={<Icon name="users-01" fontSize={24} color={variables.color_grey_700} />}
      message="No applicants yet"
    />
  );
};
