import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { Loader } from './complete-mission.types';
import { endpoint } from 'src/core/endpoints';

export const useCompleteMissionShared = () => {
  const resolver = useMatch().ownData;
  const { offer, mission } = (resolver as Loader) || {};
  const [status, setStatus] = useState(offer.status);

  function onCompleteMission() {
    endpoint.post.missions['{mission_id}/complete'](mission.id).then(() => setStatus('CLOSED'));
  }

  function onStopMission() {
    // TODO: ask @jeyem the current status string
    endpoint.post.missions['{mission_id}/cancel'](mission.id).then(() => setStatus('KICK_OUT'));
  }

  return { offer, status, onCompleteMission, onStopMission };
};
