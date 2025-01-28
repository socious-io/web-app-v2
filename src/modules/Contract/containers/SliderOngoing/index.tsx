import { UserType } from 'src/core/types';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { ThreeDotButton } from 'src/modules/general/components/threeDotButton';
import { MenuItem } from 'src/modules/general/components/threeDotButton/threeDotButton.types';

import { useSliderOngoing } from './useSliderOngoing';
import { ContractSliderProps } from '../ContractDetailsSlider/index.types';
import InitiateDisputeModal from '../InitiateDisputeModal';

const SliderOngoing: React.FC<ContractSliderProps> = ({ disableMessage, redirectToChat, contract }) => {
  const {
    data: {
      alertMessage,
      displayComplete,
      openAlert,
      partnerName,
      partnerUsername,
      partnerType,
      partnerId,
      openInitiateDisputeModal,
      missionId,
    },
    operations: { setOpenAlert, onComplete, setOpenInitiateDisputeModal, navigateToProfile, onEndContract },
  } = useSliderOngoing(contract);

  const menuItems: MenuItem[] = [
    {
      iconName: 'building-06',
      title: translate('cont-profile-title', { name: partnerName }),
      onClick: () => {
        navigateToProfile(partnerUsername, partnerType as UserType);
      },
    },
    {
      iconName: 'message-alert-circle',
      title: translate('cont-initiate-dispute'),
      onClick: () => setOpenInitiateDisputeModal(true),
    },
    {
      iconName: 'x-circle',
      title: translate('cont-end'),
      onClick: onEndContract,
    },
  ];

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
        {contract.type !== 'VOLUNTEER' && alertMessage}
      </div>
      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onSubmit={onComplete}
        message={translate('cont-complete-msg', { name: partnerName })}
        title={translate('cont-complete-confirm')}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel={translate('cont-cancel')}
        submitButton={true}
        submitButtonLabel={translate('cont-confirm')}
      />
      <InitiateDisputeModal
        open={openInitiateDisputeModal}
        handleClose={() => setOpenInitiateDisputeModal(false)}
        respondentId={partnerId}
        missionId={missionId}
      />
    </>
  );
};

export default SliderOngoing;
