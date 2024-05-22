import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, cancelMission, completeMission, dropMission } from 'src/core/api';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderOngoing = (contract: Contract) => {
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<ReactNode>();
  const [primaryBtn, setPrimaryBtn] = useState<{ display: boolean; label?: string; action?: () => void }>({
    display: false,
    label: '',
  });
  const [secondaryBtn, setSecondaryBtn] = useState<{ display: boolean; label?: string; action?: () => void }>({
    display: false,
    label: '',
  });
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();
  const initialize = () => {
    setAlertMessage(
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
      ),
    );
    setDisplayAlert(contract.project.payment_type !== 'VOLUNTEER');
    setPrimaryBtn({ display: identityType === 'users', label: 'Complete', action: () => setOpenAlert(true) });
    setSecondaryBtn({ display: true, label: 'Stop', action: identityType === 'users' ? handleStop : handleStopByOP });
  };

  useEffect(() => {
    initialize();
  }, []);

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

  return { displayAlert, alertMessage, primaryBtn, secondaryBtn, openAlert, setOpenAlert, handleComplete };
};
