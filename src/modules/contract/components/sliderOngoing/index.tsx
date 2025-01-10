import React from 'react';
import { Contract } from 'src/core/api';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { ThreeDotButton } from 'src/modules/general/components/threeDotButton';

import { useSliderOngoing } from './useSliderOngoing';
import InitiateDisputeModal from '../initiateDisputeModal';

interface SliderOngoingProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}
export const SliderOngoing: React.FC<SliderOngoingProps> = ({ disableMessage, redirectToChat, contract }) => {
  const {
    displayComplete,
    displayAlert,
    alertMessage,
    openAlert,
    setOpenAlert,
    handleComplete,
    menuItems,
    openInitiateDisputeModal,
    setOpenInitiateDisputeModal,
    respondentId,
    missionId,
    name,
  } = useSliderOngoing(contract);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          {displayComplete && (
            <Button variant="contained" color="primary" fullWidth onClick={() => setOpenAlert(true)}>
              {translate('cont-complete-btn')}
            </Button>
          )}
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            {translate('cont-message')}
          </Button>
          <ThreeDotButton menuItems={menuItems} />
        </div>
        {displayAlert && alertMessage}
      </div>
      {openAlert && (
        <AlertModal
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          onSubmit={handleComplete}
          message={translate('cont-complete-msg', { name: name })}
          title={translate('cont-complete-confirm')}
          customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />}
          closeButtn={true}
          closeButtonLabel={translate('cont-cancel')}
          submitButton={true}
          submitButtonLabel={translate('cont-confirm')}
        />
      )}
      <InitiateDisputeModal
        open={openInitiateDisputeModal}
        handleClose={() => setOpenInitiateDisputeModal(false)}
        respondentId={respondentId}
        missionId={missionId}
      />
    </>
  );
};
