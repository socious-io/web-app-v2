import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyContractAdaptor, cancelContractAdaptor, Contract } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { getIdentityMeta, navigateToProfile, translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';
// import { getContractsByFilter } from 'src/store/thunks/contracts.thunk';

export const useSliderOngoing = (contract: Contract) => {
  const dispatch = useDispatch();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;
  const currentIdentityId = identity?.id;
  const [openAlert, setOpenAlert] = useState(false);
  const [openInitiateDisputeModal, setOpenInitiateDisputeModal] = useState(false);
  // const page = useSelector<RootState, number>(state => state.contracts.page);
  // const filter = useSelector<RootState, 'all' | 'ongoing' | 'archived'>(state => state.contracts.filter);
  const { name: partnerName, username: partnerUsername, type: partnerType } = getIdentityMeta(contract.partner);
  const partnerId = contract.partner?.id || '';
  const missionId = contract.missionId || '';
  const currentIdentityIsClient = currentIdentityId === contract.clientId;
  // FIXME: kind from BE instead of checking with offerId
  const alertMessage = currentIdentityIsClient ? (
    <AlertMessage
      theme="primary"
      iconName="check-circle"
      title={contract.offerId ? translate('cont-confirm-alert-msg') : 'You have accepted this job'}
      subtitle={
        contract.offerId
          ? translate('cont-confirm-alert-subtitle')
          : 'Once you have finished your work please click on complete button.'
      }
    />
  ) : (
    <AlertMessage
      theme="warning"
      iconName="alert-circle"
      title={contract.offerId ? translate('cont-unsuccessful-payment') : 'Awaiting completion'}
      subtitle={
        contract.offerId
          ? translate('cont-start-job', { name: partnerName })
          : 'This job is ongoing and awaiting completion'
      }
    />
  );

  const updateState = (status: 'APPLIED' | 'CLIENT_CANCELED' | 'PROVIDER_CANCELED') => {
    // if (filter === 'ongoing') {
    //   dispatch(handleDisplaySlider(false));
    //   await store.dispatch(getContractsByFilter({ filter, page, limit: 5, identityType: identityType as UserType }));
    // } else {
    dispatch(
      updateStatus({
        id: contract.id,
        status,
        isCurrentProvider: identityType === contract.providerId,
        type: contract.type,
        paymentId: contract.paymentId,
      }),
    );
    // }
  };

  const onComplete = async () => {
    setOpenAlert(false);
    await applyContractAdaptor(contract.id);
    updateState('APPLIED');
    setOpenAlert(false);
  };

  const onEndContract = async () => {
    await cancelContractAdaptor(contract.id);
    await updateState(currentIdentityId === contract.clientId ? 'CLIENT_CANCELED' : 'PROVIDER_CANCELED');
  };

  return {
    data: {
      alertMessage,
      displayComplete: currentIdentityIsClient,
      openAlert,
      openInitiateDisputeModal,
      partnerName,
      partnerUsername,
      partnerType,
      partnerId,
      missionId,
    },
    operations: {
      setOpenAlert,
      onComplete,
      setOpenInitiateDisputeModal,
      navigateToProfile,
      onEndContract,
    },
  };
};
