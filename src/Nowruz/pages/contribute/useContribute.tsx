import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UserProfile } from 'src/core/api';

export const useContribute = () => {
  const { user } = useLoaderData() as { user: UserProfile };
  const eligible = user.impact_points >= 10000;

  // TODO: setJoined based on this proprty in profile res: is_contributor whenever BE is ready
  const [joined, setJoined] = useState(false);

  const [newlyJoined, setNewlyJoined] = useState(false);

  return { eligible, newlyJoined, setNewlyJoined, joined, setJoined };
};
