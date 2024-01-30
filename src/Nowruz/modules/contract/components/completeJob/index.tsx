import React from 'react';
import { Mission, Offer } from 'src/core/api';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';

import { useCompleteJob } from './useCompleteJob';
import { ContractDetailsSlider } from '../contractDetailsSlider';

interface CompleteJobProps {
  offer: Offer;
  mission: Mission;
}

export const CompleteJob: React.FC<CompleteJobProps> = ({ offer, mission }) => {
  const { handleComplete, handleStop, openAlert, setOpenAlert, displayMessage, message, displayButton } =
    useCompleteJob(offer, mission);
  return (
    <>
      <ContractDetailsSlider
        offer={offer}
        displayMessage={displayMessage}
        messageComponent={message}
        displayPrimaryButton={displayButton}
        displaySecondaryButton={displayButton}
        primaryButtonLabel="Complete"
        secondaryButtonLabel="Stop"
        primaryButtonAction={() => setOpenAlert(true)}
        secondaryButtonAction={handleStop}
      />

      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onSubmit={handleComplete}
        message="Once Ocean Protection confirms the job completion, you will receive your payment."
        title="Submit job completion?"
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonLabel="Confirm"
      />
    </>
  );
};
