import React from 'react';
import { Contract } from 'src/core/api';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';

import { useSliderOngoing } from './useSliderOngoing';

interface SliderOngoingProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}
export const SliderOngoing: React.FC<SliderOngoingProps> = ({ disableMessage, redirectToChat, contract }) => {
  const { primaryBtn, secondaryBtn, displayAlert, alertMessage, openAlert, setOpenAlert, handleComplete } =
    useSliderOngoing(contract);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          {!disableMessage && (
            <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
              Message
            </Button>
          )}
          {secondaryBtn.display && (
            <Button variant="outlined" color="secondary" fullWidth onClick={secondaryBtn.action}>
              {secondaryBtn.label}
            </Button>
          )}
        </div>
        {primaryBtn.display && (
          <Button variant="contained" color="primary" onClick={primaryBtn.action}>
            {primaryBtn.label}
          </Button>
        )}

        {displayAlert && alertMessage}
      </div>
      {openAlert && (
        <AlertModal
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          onSubmit={handleComplete}
          message={`Once ${name} confirms the job completion, you will receive your payment.`}
          title="Submit job completion?"
          customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />}
          closeButtn={true}
          closeButtonLabel="Cancel"
          submitButton={true}
          submitButtonLabel="Confirm"
        />
      )}
    </>
  );
};
