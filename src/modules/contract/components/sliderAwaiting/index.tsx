import React, { ReactNode } from 'react';
import { Contract, CurrentIdentity, cancelOffer, confirmMission, hireOffer } from 'src/core/api';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { ThreeDotButton } from 'src/modules/general/components/threeDotButton';

import { useSliderAwaiting } from './useSliderAwaiting';
import InitiateDisputeModal from '../initiateDisputeModal';

interface SliderAwaitingProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}

export const SliderAwaiting: React.FC<SliderAwaitingProps> = ({ contract, disableMessage, redirectToChat }) => {
  const {
    onConfirm,
    primaryBtn,
    secondaryBtn,
    alertMsg,
    openAlert,
    setOpenAlert,
    displayDispute,
    menuItems,
    openInitiateDisputeModal,
    setOpenInitiateDisputeModal,
    respondentId,
    missionId,
  } = useSliderAwaiting(contract);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            {translate('cont-message')}
          </Button>
          {secondaryBtn.display && (
            <Button variant="outlined" color="secondary" fullWidth onClick={secondaryBtn.action}>
              {secondaryBtn.label}
            </Button>
          )}
          {displayDispute && <ThreeDotButton menuItems={menuItems} />}
        </div>
        {primaryBtn.display && (
          <Button variant="contained" color="primary" onClick={primaryBtn.action} disabled={primaryBtn.disabled}>
            {primaryBtn.label}
          </Button>
        )}
        {alertMsg}
      </div>
      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onSubmit={onConfirm}
        message="Do you want to confirm job completion?"
        title="Confirm completion"
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonLabel="Confirm"
      />
      <InitiateDisputeModal
        open={openInitiateDisputeModal}
        handleClose={() => setOpenInitiateDisputeModal(false)}
        respondentId={respondentId}
        missionId={missionId}
      />
    </>
  );
};
