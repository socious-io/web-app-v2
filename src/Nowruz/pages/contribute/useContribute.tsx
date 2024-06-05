import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UserProfile } from 'src/core/api';

export const useContribute = () => {
  const { user } = useLoaderData() as { user: UserProfile };
  const eligible = true; // user.impact_points >= 10000;
  const joined = true;

  const [newlyJoined, setNewlyJoined] = useState(false);

  return { eligible, joined, newlyJoined, setNewlyJoined };
};
