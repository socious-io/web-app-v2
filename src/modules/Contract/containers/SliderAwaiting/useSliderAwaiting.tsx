import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelContractAdaptor, completeContractAdaptor, Contract } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { getIdentityMeta, navigateToProfile } from 'src/core/utils';
import dapp from 'src/dapp';
import { useWeb3 } from 'src/dapp/dapp.connect';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderAwaiting = (contract: Contract) => {
  const dispatch = useDispatch();
  const { signer, chainId } = useWeb3();
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
    try {
      let allowConfirm = true;
      if (contract.payment === 'CRYPTO') {
        if (signer && chainId) {
          await dapp.withdrawnEscrow({
            signer,
            chainId,
            escrowId: contract?.paymentId as string,
          });
        } else {
          allowConfirm = false;
          // await web3.open();
        }
      }
      if (allowConfirm) {
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
      }
    } catch (e) {
      console.log('Error in confirming contract', e);
    }
    setDisabledPrimaryButton(false);
  };

  return {
    data: {
      currentIdentityIsClient,
      disabledPrimaryButton,
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