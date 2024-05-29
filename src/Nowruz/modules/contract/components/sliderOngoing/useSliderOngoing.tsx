import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, cancelMission, completeMission, dropMission } from 'src/core/api';
import { UserType } from 'src/core/types';
import { getIdentityMeta, navigateToProfile } from 'src/core/utils';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { MenuItem } from 'src/Nowruz/modules/general/components/threeDotButton/threeDotButton.types';
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

  const displayAlert = contract.project.payment_type !== 'VOLUNTEER';
  const alertMessage =
    identityType === 'users' ? (
      <AlertMessage
        theme="primary"
        iconName="check-circle"
        title="Your job has been confirmed"
        subtitle="Once you have finished your work please click on <b>complete</b> button."
      />
    ) : (
      <AlertMessage
        theme="primary"
        iconName="alert-circle"
        title="Payment was done successfully"
        subtitle={`${name} can now start the job`}
      />
    );
  const displayComplete = identityType === 'users';

  const [openAlert, setOpenAlert] = useState(false);
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
      title: `${name}'s profile`,
      onClick: () => {
        navigateToProfile(username, type as UserType);
      },
    },
    {
      iconName: 'message-alert-circle',
      title: 'Initiate a dispute',
      // TODO: add open dispute modal
      onClick: () => {
        console.log('TODO: add open dispute modal');
      },
    },
    {
      iconName: 'x-circle',
      title: 'End contract',
      onClick: identityType === 'users' ? handleStop : handleStopByOP,
    },
  ];
  return { displayAlert, alertMessage, displayComplete, openAlert, setOpenAlert, handleComplete, menuItems };
};
