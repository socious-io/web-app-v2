import { useEffect, useState } from 'react';
import { Dispute } from 'src/core/api';
import { disputes } from 'src/core/api/disputes/disputes.api';

export const useContributorDashboard = () => {
  const [stopNotif, setStopNotif] = useState(false);
  const [list, setList] = useState<Dispute[]>([]);

  useEffect(() => {
    const getDisputes = async () => {
      const res = await disputes();
    };
    getDisputes();
  }, []);

  return { stopNotif, setStopNotif, list };
};
