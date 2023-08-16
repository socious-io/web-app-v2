import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { Loader } from './complete-mission.types';
import { endpoint } from 'src/core/endpoints';
import { useAlert } from 'src/hooks/use-alert';

export const useCompleteMissionShared = () => {
  const resolver = useMatch().ownData;
  const { offer, mission, media } = (resolver as Loader) || {};
  const [status, setStatus] = useState(offer.status);
  const alert = useAlert();

  function onCompleteMission() {
    function onConfirm() {
      endpoint.post.missions['{mission_id}/complete'](mission.id).then(() => setStatus('CLOSED'));
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
    endpoint.post.missions['{mission_id}/cancel'](mission.id).then(() => setStatus('KICK_OUT'));
  }

  return { offer, media, status, onCompleteMission, onStopMission };
};
