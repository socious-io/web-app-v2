import { useState } from 'react';

export const useContributorDashboard = () => {
  const [stopNotif, setStopNotif] = useState(false);
  return { stopNotif, setStopNotif };
};
