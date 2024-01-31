import { useSelector } from 'react-redux';
import { CurrentIdentity, Organization, User } from 'src/core/api';
import { RootState } from 'src/store';

export const useRecommedation = () => {
  const user = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  }) as User;

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;

  return { myProfile, user };
};
