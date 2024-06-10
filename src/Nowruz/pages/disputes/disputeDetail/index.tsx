import { useSelector } from 'react-redux';
import { CurrentIdentity, Identity } from 'src/core/api';
import { TimelineItem } from 'src/Nowruz/modules/dispute/components/timelineItem';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import { RootState } from 'src/store';

import { useDisputeDetail } from './useDisputeDetail';

export const DisputeDetail = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const { dispute, alertInfo, openModal, setOpenModal, primaryBtn, secondaryBtn, handleWithdraw } = useDisputeDetail();
  return (
    <>
      <div className="pt-8 pb-12 px-4 md:px-8 flex flex-col gap-8">
        <div className="flex flex-col">
          <div className="mb-5 w-fit">
            <BackLink
              title="Back to disputes"
              // TODO: add back to dispute list
              // onBack={}
              block={false}
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-semibold leading-8 text-Gray-light-mode-900">{dispute.code}</span>
              <span className="text-base font-normal leading-6 text-Gray-light-mode-600">{dispute.title}</span>
            </div>

            <div className="flex flex-col gap-3 md:hidden">
              {secondaryBtn?.display && (
                <Button variant="outlined" color="primary" onClick={secondaryBtn.action}>
                  {secondaryBtn.label}
                </Button>
              )}
              {primaryBtn?.display && (
                <Button variant="contained" color="primary" onClick={primaryBtn.action}>
                  {primaryBtn.label}
                </Button>
              )}
            </div>

            {alertInfo.title && (
              <div
                className={`flex flex-col md:flex-row gap-4 rounded-xl p-4 items-start border border-solid border-Gray-light-mode-300 shadow-Shadows/shadow-xs  `}
              >
                <FeaturedIconOutlined iconName="alert-circle" size="md" theme={alertInfo.theme} />
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold leading-5 text-Gray-light-mode-700">{alertInfo.title}</div>
                  <div className={'text-sm font-normal left-5 text-Gray-light-mode-600'}>
                    <span className="text-Brand-700">{alertInfo.subtitleName}</span>
                    {alertInfo.subtitle}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-6 md:justify-between">
          <div className="w-full md:w-[360px] rounded-xl border border-solid border-Gray-light-mode-200 bg-Gray-light-mode-50 p-6 flex flex-col">
            <span className="mb-4 text-base font-semibold leading-6 text-Gray-light-mode-700">Contract disputed</span>
            <div className="rounded-xl border border-solid border-Gray-light-mode-200 bg-Base-White">
              <div className="h-[72px] px-6 py-4 flex flex-col border border-solid border-y-0 border-t-0 border-Gray-light-mode-200">
                <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">Contract ID</span>
                {/* TODO: Add contract detail when API result includes contract */}
                <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">xxxxxxxxxxxxxx</span>
              </div>
              <div className="h-[72px] px-6 py-4 flex flex-col">
                <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">Contract name</span>
                {/* TODO: Add contract detail when API result includes contract */}
                <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">xxxxxxxxxxxxxx</span>
              </div>
            </div>
            <div className="hidden md:flex mt-8 md:flex-col gap-3">
              {secondaryBtn?.display && (
                <Button variant="outlined" color="primary" onClick={secondaryBtn.action}>
                  {secondaryBtn.label}
                </Button>
              )}
              {primaryBtn?.display && (
                <Button variant="contained" color="primary" onClick={primaryBtn.action}>
                  {primaryBtn.label}
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            {dispute.events
              .map(item => {
                return { ...item, creator: currentIdentity as Identity, createDate: new Date() };
              })
              .map((item, index) => (
                <TimelineItem key={item.id} event={item} displayDivider={index < dispute.events.length - 1} />
              ))}
          </div>
        </div>
      </div>
      {openModal && (
        <AlertModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="Withdraw dispute"
          message="Are you sure you want to withdraw this dispute? This action cannot be undone."
          customIcon={<FeaturedIcon iconName="alert-circle" size="lg" type="light-circle" theme="error" />}
          closeButtn={true}
          closeButtonLabel="Cancel"
          submitButton={true}
          submitButtonTheme="error"
          submitButtonLabel="Withdraw Dispute"
          customClassName="md:!w-[544px]"
          primaryBtnClassName="w-full md:w-fit"
          secondaryBtnClassName="w-full md:w-fit"
          onSubmit={handleWithdraw}
        />
      )}
    </>
  );
};
