import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, cancelMission, completeMission, dropMission } from 'src/core/api';
import { UserType } from 'src/core/types';
import { getIdentityMeta, navigateToProfile, translate } from 'src/core/utils';
import { AlertMessage } from 'src/modules/general/components/alertMessage';
import { MenuItem } from 'src/modules/general/components/threeDotButton/threeDotButton.types';
import store, { RootState } from 'src/store';
import { handleDisplaySlider, updateStatus } from 'src/store/reducers/contracts.reducer';
import { getContractsByFilter } from 'src/store/thunks/contracts.thunk';

export const useSliderOngoing = (contract: Contract) => {
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const page = useSelector<RootState, number>(state => state.contracts.page);
  const identityType = identity?.type;
  const filter = useSelector<RootState, 'all' | 'ongoing' | 'archived'>(state => state.contracts.filter);
  const { name, username, type } = getIdentityMeta(identityType === 'users' ? contract.offerer : contract.recipient);
  const respondentId = identityType === 'users' ? contract.offerer.id : contract.recipient.id;
  const missionId = contract.mission?.id || '';

  const displayAlert = contract.project.payment_type !== 'VOLUNTEER';
  const alertMessage =
    identityType === 'users' ? (
      <AlertMessage
        theme="primary"
        iconName="check-circle"
        title={translate('cont-confirm-alert-msg')}
        subtitle={translate('cont-confirm-alert-subtitle')}
      />
    ) : (
      <AlertMessage
        theme="primary"
        iconName="alert-circle"
        title={translate('cont-unsuccessful-payment')}
        subtitle={translate('cont-start-job', { name: name })}
      />
    );
  const displayComplete = identityType === 'users';

  const [openAlert, setOpenAlert] = useState(false);
  const [openInitiateDisputeModal, setOpenInitiateDisputeModal] = useState(false);
  const dispatch = useDispatch();

  const updateState = async (missionStatus: 'COMPLETE' | 'CANCELED' | 'KICKED_OUT') => {
    if (filter === 'ongoing') {
      dispatch(handleDisplaySlider(false));
      await store.dispatch(getContractsByFilter({ filter, page, limit: 5, identityType: identityType as UserType }));
    } else {
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'CLOSED',
          missionStatus: missionStatus,
        }),
      );
    }
  };
  const handleComplete = async () => {
    setOpenAlert(false);
    try {
      if (contract.mission) completeMission(contract.mission.id);
      await updateState('COMPLETE');
    } catch (e) {
      console.log('error in completing contract', e);
    }
    setOpenAlert(false);
  };
  const handleStop = async () => {
    try {
      if (contract.mission) cancelMission(contract.mission.id);
      await updateState('CANCELED');
    } catch (e) {
      console.log('error in stopping contract', e);
    }
  };

  const handleStopByOP = async () => {
    try {
      if (contract.mission) await dropMission(contract.mission.id);
      await updateState('KICKED_OUT');
    } catch (e) {
      console.log('error in stopping contract by organization', e);
    }
  };

  const menuItems: MenuItem[] = [
    {
      iconName: 'building-06',
      title: translate('cont-profile-title', { name: name }),
      onClick: () => {
        navigateToProfile(username, type as UserType);
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
      onClick: identityType === 'users' ? handleStop : handleStopByOP,
    },
  ];
  return {
    displayAlert,
    alertMessage,
    displayComplete,
    openAlert,
    setOpenAlert,
    handleComplete,
    menuItems,
    openInitiateDisputeModal,
    setOpenInitiateDisputeModal,
    respondentId,
    missionId,
    name,
  };
};
