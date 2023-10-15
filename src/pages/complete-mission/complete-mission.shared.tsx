import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { cancelMission, completeMission } from 'src/core/api';
import { useAlert } from 'src/hooks/use-alert';

import { Loader } from './complete-mission.types';

export const useCompleteMissionShared = () => {
  const resolver = useLoaderData() as Loader;
  const { offer, mission, media } = resolver || {};
  const [status, setStatus] = useState(offer.status);
  const alert = useAlert();

  function onCompleteMission() {
    function onConfirm() {
      completeMission(mission.id).then(() => setStatus('CLOSED'));
    }

    const options = {
      title: 'Mark as completed',
      message: `Once ${resolver?.offer?.organization?.name} confirms the job completion, you will receive your payment.`,
      okButtonTitle: 'Confirm',
    };
    alert.confirm(options, onConfirm);
  }

  function onStopMission() {
    // TODO: ask @jeyem the current status string
    cancelMission(mission.id).then(() => setStatus('KICK_OUT'));
  }

  return { offer, media, status, onCompleteMission, onStopMission };
};
