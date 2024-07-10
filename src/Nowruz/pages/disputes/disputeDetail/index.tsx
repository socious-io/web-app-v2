import { Icon } from 'src/Nowruz/general/Icon';
import RespondDisputeModal from 'src/Nowruz/modules/contract/components/respondDisputeModal';
import { SubmitDecision } from 'src/Nowruz/modules/dispute/components/submitDecisionModal';
import { TimelineItem } from 'src/Nowruz/modules/dispute/components/timelineItem';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import { Link } from 'src/Nowruz/modules/general/components/link';

import { useDisputeDetail } from './useDisputeDetail';

export const DisputeDetail = () => {
  const {
    dispute,
    setDispute,
    alertInfo,
    openModal,
    setOpenModal,
    primaryBtn,
    secondaryBtn,
    handleWithdraw,
    redirectToChat,
    handleCloseSubmit,
    handleRespond,
    handleBack,
    handleCloseImpactPoint,
  } = useDisputeDetail();
  return (
    <>
      <div className="pt-8 pb-12 px-4 md:px-8 flex flex-col gap-8">
        <div className="flex flex-col">
          <div className="mb-5 w-fit">
            <BackLink title="Back to disputes" onBack={handleBack} block={false} />
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
                <FeaturedIconOutlined iconName={alertInfo.icon} size="md" theme={alertInfo.theme} />
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
              <div className="px-6 py-4 flex flex-col border border-solid border-0 border-b border-Gray-light-mode-200">
                <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">Contract ID</span>
                <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">{dispute.contract.id}</span>
              </div>
              <div className="h-[72px] px-6 py-4 flex flex-col">
                <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">Contract name</span>
                <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">{dispute.contract.name}</span>
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
            {dispute.direction === 'juror' && (
              <div className="flex flex-col gap-3 items-center">
                <a
                  className=" flex gap-2 !h-fit !p-0 cursor-pointer font-medium text-base leading-6 text-Brand-700"
                  href="https://socious.io/contact"
                  target="_blank"
                  rel="noreferrer"
                >
                  get support
                  <Icon name="arrow-narrow-up-right" fontSize={20} className="text-Brand-700" />
                </a>

                {/* TODO: ADD anonymous chat function */}

                {/* <Button variant="text" color="primary" customStyle="flex gap-2 !h-fit !p-0" fullWidth>
                  <span className="underline text-base font-medium leading-6">Chat with jurors</span>
                  <Icon name="arrow-narrow-up-right" fontSize={20} className="text-Brand-700" />
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  customStyle="flex gap-2 !h-fit !p-0"
                  fullWidth
                //onClick={() => redirectToChat('claimant')}
                >
                  <span className="underline text-base font-medium leading-6">Chat with the claimant only</span>
                  <Icon name="arrow-narrow-up-right" fontSize={20} className="text-Brand-700" />
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  customStyle="flex gap-2 !h-fit !p-0"
                  fullWidth
                //onClick={() => redirectToChat('respondent')}
                >
                  <span className="underline text-base font-medium leading-6">Chat with the respondent only</span>
                  <Icon name="arrow-narrow-up-right" fontSize={20} className="text-Brand-700" />
                </Button> */}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col">
            <div className="mb-6 md:mb-8 font-semibold text-2xl leading-8 text-Gray-light-mode-900">Timeline</div>
            {dispute.events.map((item, index) => (
              <TimelineItem
                key={item.id}
                event={item}
                displayDivider={index < dispute.events.length - 1}
                disputeDirection={dispute.direction}
                respondent={dispute.respondent}
              />
            ))}
          </div>
        </div>
      </div>
      <AlertModal
        open={openModal.name === 'withdraw' && openModal.open}
        onClose={() => setOpenModal({ open: false })}
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

      <SubmitDecision
        disputeId={dispute.id}
        open={openModal.name === 'submitDecision' && openModal.open}
        handleClose={handleCloseSubmit}
        setDispute={setDispute}
        claimant={dispute.claimant}
        respondent={dispute.respondent}
      />

      <RespondDisputeModal
        disputeId={dispute.id}
        open={openModal.name === 'response' && openModal.open}
        handleClose={() => setOpenModal({ ...openModal, open: false })}
        onSubmitRespond={handleRespond}
      />

      <AlertModal
        open={openModal.name === 'impactPoint' && openModal.open}
        onClose={handleCloseImpactPoint}
        title="Decision submitted"
        message="Thank you for submitting your decision as a juror. The final outcome will be determined once all jurors have voted.<br/>We appreciate your participation in the Socious dispute resolution process."
        customIcon={<FeaturedIcon iconName="stars-02" size="lg" type="light-circle" theme="success" />}
        closeButtn={false}
        submitButton={false}
      >
        <div className="p-6 border border-solid border-Gray-light-mode-200 rounded-xl flex flex-col gap-2">
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">You’ve earned</span>
          <div className="flex gap-2 items-end">
            <span className="text-5xl font-semibold text-Gray-light-mode-900">100</span>
            <span className="text-base font-normal leading-6 text-Gray-light-mode-600">impact points</span>
          </div>
        </div>
      </AlertModal>
    </>
  );
};
