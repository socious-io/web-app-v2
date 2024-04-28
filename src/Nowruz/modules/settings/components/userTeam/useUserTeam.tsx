import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentIdentity, getOrganizationMembers, identities, removeOrganizationMember } from 'src/core/api';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useUserTeam = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const teams = useSelector<RootState, CurrentIdentity[]>(state =>
    state.identity.entities.filter(item => item.type === 'organizations'),
  );
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{ id: string; name: string; count: number }>({
    id: '',
    name: '',
    count: 1,
  });

  const handleLeave = async (orgId: string) => {
    try {
      if (currentIdentity?.id) {
        await removeOrganizationMember(orgId, currentIdentity?.id);
        const resp = await identities();
        dispatch(setIdentityList(resp));
        handleCloseModal();
      }
    } catch (error) {
      console.log('error in leaving a team: ', error);
    }
  };

  const handleOpenModal = async (id: string, organizationName: string) => {
    try {
      const { total_count } = (await getOrganizationMembers(id, { limit: 10, page: 1 })) || 1;
      setOpenModal(true);
      setSelectedMember({ id, name: organizationName, count: total_count });
    } catch (e) {
      console.log('error in getting memebers count', e);
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  return { teams, selectedMember, handleLeave, openModal, handleOpenModal, handleCloseModal };
};
