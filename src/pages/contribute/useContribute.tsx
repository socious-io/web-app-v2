import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { UserMeta, User } from 'src/core/api';
import { RootState } from 'src/store';

export const useContribute = () => {
  const { user } = useLoaderData() as { user: User };
  const eligible = user.impact_points >= 10000;
  const joined = useSelector<RootState, boolean | undefined>(
    state => (state.identity.entities.find(item => item.current)?.meta as UserMeta).is_contributor,
  );

  const [newlyJoined, setNewlyJoined] = useState(false);

  return { eligible, newlyJoined, setNewlyJoined, joined };
};
