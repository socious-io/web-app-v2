import { ReactNode, useState } from 'react';
import { Mission, Offer, cancelMission, completeMission } from 'src/core/api';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';

export const useCompleteJob = (offer: Offer, mission: Mission) => {
  const name = offer.offerer.meta.name;
  const [displayButton, setDisplayButton] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(true);
  const [message, setMessage] = useState<ReactNode>(
    <AlertMessage
      theme="primary"
      iconName="check-circle"
      title="Your job has been confirmed"
      subtitle="Once you have finished your work please click on complete button."
    />,
  );

  const handleStop = async () => {
    await cancelMission(mission.id);
    setDisplayMessage(true);
    setDisplayButton(false);
    setMessage('');
  };
  const handleComplete = async () => {
    setOpenAlert(false);
    await completeMission(mission.id);
    setDisplayMessage(true);
    setDisplayButton(false);
    setMessage(
      <AlertMessage
        theme="warning"
        iconName="alert-circle"
        title="Completion submitted"
        subtitle={`Awaiting confirmation from ${name}`}
      />,
    );
  };
  return {
    handleComplete,
    handleStop,
    openAlert,
    setOpenAlert,
    displayMessage,
    message,
    displayButton,
  };
};
