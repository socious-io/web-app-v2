import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, cancelMission, completeMission, dropMission } from 'src/core/api';
import { UserType } from 'src/core/types';
import { getIdentityMeta, navigateToProfile } from 'src/core/utils';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { MenuItem } from 'src/Nowruz/modules/general/components/threeDotButton/threeDotButton.types';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderOngoing = (contract: Contract) => {
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;
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

  const handleComplete = async () => {
    setOpenAlert(false);
    try {
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'CLOSED',
          missionStatus: 'COMPLETE',
        }),
      );
      if (contract.mission) completeMission(contract.mission.id);
    } catch (e) {
      console.log('error in completing contract', e);
    }
    setOpenAlert(false);
  };
  const handleStop = async () => {
    try {
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'CLOSED',
          missionStatus: 'CANCELED',
        }),
      );
      if (contract.mission) cancelMission(contract.mission.id);
    } catch (e) {
      console.log('error in stopping contract', e);
    }
  };

  const handleStopByOP = async () => {
    try {
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'CLOSED',
          missionStatus: 'KICKED_OUT',
        }),
      );
      if (contract.mission) dropMission(contract.mission.id);
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
