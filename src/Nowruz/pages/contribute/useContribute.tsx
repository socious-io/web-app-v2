import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UserProfile } from 'src/core/api';

export const useContribute = () => {
  const { user } = useLoaderData() as { user: UserProfile };
  const eligible = user.impact_points >= 10000;

  const [joined, setJoined] = useState(user.is_contributor);

  const [newlyJoined, setNewlyJoined] = useState(false);

  return { eligible, newlyJoined, setNewlyJoined, joined, setJoined };
};
