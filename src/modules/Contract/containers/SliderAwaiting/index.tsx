import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { ThreeDotButton } from 'src/modules/general/components/threeDotButton';
import { MenuItem } from 'src/modules/general/components/threeDotButton/threeDotButton.types';
import ConnectButton from 'src/modules/wallet/components/ConnectButton';

import { useSliderAwaiting } from './useSliderAwaiting';
import { ContractSliderProps } from '../ContractDetailsSlider/index.types';
import InitiateDisputeModal from '../InitiateDisputeModal';
import { UserType } from 'src/core/api';

const SliderAwaiting: React.FC<ContractSliderProps> = ({ contract, disableMessage, redirectToChat }) => {
  const {
    data: {
      currentIdentityIsClient,
      disabledPrimaryButton,
      allowConfirm,
      openAlert,
      openInitiateDisputeModal,
      partnerName,
      partnerUsername,
      partnerType,
      partnerId,
      missionId,
    },
    operations: { onWithdrawOffer, setOpenAlert, onConfirm, setOpenInitiateDisputeModal, navigateToProfile },
  } = useSliderAwaiting(contract);

  const renderSecondaryButton = {
    SIGNED: {
      children: translate('cont-cancel'),
      onClick: onWithdrawOffer,
    },
  }[contract.status];

  const renderAlertMessage = {
    SIGNED: {
      theme: 'primary',
      iconName: 'check-circle',
      title: currentIdentityIsClient
        ? translate('cont-awaiting-title-you')
        : translate('cont-awaiting-title-name', { name: partnerName }),
      subtitle: currentIdentityIsClient
        ? translate('cont-awaiting-desc', { name: partnerName })
        : translate('cont-awaiting-desc', { name: 'you' }),
    },
    APPLIED: {
      theme: 'warning',
      iconName: 'alert-circle',
      title: currentIdentityIsClient ? translate('cont-complete-submit') : translate('cont-awaiting-confirm'),
      subtitle: currentIdentityIsClient
        ? translate('cont-awaiting-msg', { name: partnerName })
        : `${translate('cont-awaiting-confirm-msg', { name: partnerName })}${contract.type === 'PAID' ? translate('cont-awaiting-confirm-msg-rest') : ''}`,
    },
  }[contract.status];

  const menuItems: MenuItem[] = [
    {
      iconName: 'building-06',
      title: translate('cont-profile-title', { name: partnerName }),
      onClick: () => {
        navigateToProfile(partnerUsername, partnerType as UserType);
      },
    },
    ...(contract.type !== 'VOLUNTEER'
      ? [
          {
            iconName: 'message-alert-circle',
            title: translate('cont-initiate-dispute'),
            onClick: () => setOpenInitiateDisputeModal(true),
          },
        ]
      : []),
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            {translate('cont-message')}
          </Button>
          {!currentIdentityIsClient && renderSecondaryButton && (
            <Button variant="outlined" color="secondary" fullWidth {...renderSecondaryButton} />
          )}
          {contract.status === 'APPLIED' && <ThreeDotButton menuItems={menuItems} />}
        </div>
        {!currentIdentityIsClient && contract.status === 'APPLIED' && (
          <Button
            variant="contained"
            color="primary"
            disabled={disabledPrimaryButton}
            onClick={() => setOpenAlert(true)}
          >
            {translate('cont-confirm-completion')}
          </Button>
        )}
        {renderAlertMessage && <AlertMessage {...renderAlertMessage} />}
      </div>
      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onSubmit={onConfirm}
        message={translate('cont-confirm-msg')}
        title={translate('cont-confirm-completion')}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel={translate('cont-cancel')}
        submitButton={true}
        disableSubmitButton={!allowConfirm}
        submitButtonLabel={translate('cont-confirm')}
      >
        {contract.payment === 'CRYPTO' && (
          <div className="mb-6">
            <ConnectButton />
          </div>
        )}
      </AlertModal>
      <InitiateDisputeModal
        open={openInitiateDisputeModal}
        handleClose={() => setOpenInitiateDisputeModal(false)}
        respondentId={partnerId}
        missionId={missionId}
      />
    </>
  );
};

export default SliderAwaiting;
