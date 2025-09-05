import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelContractAdaptor, completeContractAdaptor, Contract } from 'src/core/adaptors';
import { CurrentIdentity, OrgMeta } from 'src/core/api';
import { getIdentityMeta, navigateToProfile, translate } from 'src/core/utils';
import dapp from 'src/dapp';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderAwaiting = (contract: Contract) => {
  const dispatch = useDispatch();
  const { connected, signer, network } = dapp.useWeb3();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;
  const currentIdentityId = identity?.id;
  const [disabledPrimaryButton, setDisabledPrimaryButton] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openInitiateDisputeModal, setOpenInitiateDisputeModal] = useState(false);
  const { name: partnerName, username: partnerUsername, type: partnerType } = getIdentityMeta(contract.partner);
  const partnerId = contract.partner?.id || '';
  const missionId = contract?.missionId || '';
  const allowConfirm = contract.payment !== 'CRYPTO' || connected;
  const currentIdentityIsClient = currentIdentityId === contract.clientId;

  const onWithdrawOffer = async () => {
    await cancelContractAdaptor(contract.id);
    dispatch(
      updateStatus({
        id: contract.id,
        status: 'PROVIDER_CANCELED',
        isCurrentProvider: identityType === contract.providerId,
        type: contract.type,
        paymentId: contract.paymentId,
      }),
    );
  };

  const onConfirm = async () => {
    setOpenAlert(false);
    setDisabledPrimaryButton(true);
    const escrowId = contract?.escrowId || '';
    if (!connected) {
      alert(translate('cont-wallet-not-connected'));
      return;
    }

    if (contract.payment === 'CRYPTO' && escrowId) {
      try {
        // Get verified status from the provider's identity
        const providerVerified =
          contract.provider?.type === 'organizations'
            ? (contract.provider.meta as OrgMeta)?.verified_impact || false
            : false;

        const result = await dapp.withdrawnEscrow({
          signer,
          network,
          escrowId,
          meta: {
            ...contract?.paymentObj?.meta,
            verifiedOrg: providerVerified,
          },
        });

        if (!result) {
          setDisabledPrimaryButton(false);
          return;
        }
      } catch (error) {
        alert(error);
        setDisabledPrimaryButton(false);
        return;
      }
    }

    await completeContractAdaptor(contract.id);
    dispatch(
      updateStatus({
        id: contract.id,
        status: 'COMPLETED',
        isCurrentProvider: identityType === contract.providerId,
        type: contract.type,
        paymentId: contract.paymentId,
      }),
    );

    setDisabledPrimaryButton(false);
  };

  return {
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
    operations: {
      onWithdrawOffer,
      setOpenAlert,
      onConfirm,
      setOpenInitiateDisputeModal,
      navigateToProfile,
    },
  };
};
