import { useDispatch, useSelector } from 'react-redux';
import { CurrentIdentity, identities, removeOrganizationMember } from 'src/core/api';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useUserTeam = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) =>
    state.identity.entities.find((item) => item.current),
  );
  const teams = useSelector<RootState, CurrentIdentity[]>((state) =>
    state.identity.entities.filter((item) => item.type === 'organizations'),
  );

  const dispatch = useDispatch();

  const handleLeave = async (orgId: string) => {
    try {
      await removeOrganizationMember(orgId, currentIdentity!.id);
      const resp = await identities();
      dispatch(setIdentityList(resp));
    } catch (error) {
      console.log('error in leaving a team: ', error);
    }
  };
  return { teams, handleLeave };
};
