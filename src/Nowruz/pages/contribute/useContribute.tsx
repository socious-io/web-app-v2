import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UserProfile } from 'src/core/api';
import { disputes } from 'src/core/api/disputes/disputes.api';

export const useContribute = () => {
  const { user } = useLoaderData() as { user: UserProfile };
  const eligible = user.impact_points >= 10000;
  const joined = true;

  const [newlyJoined, setNewlyJoined] = useState(false);
  useEffect(() => {
    const getDisputes = async () => {
      if (!joined) return;
      const res = await disputes();
      console.log('test log res', res);
    };
    getDisputes();
  }, [newlyJoined]);

  return { eligible, joined, newlyJoined, setNewlyJoined };
};
