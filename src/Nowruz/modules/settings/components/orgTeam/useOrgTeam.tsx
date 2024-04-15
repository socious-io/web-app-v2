import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CurrentIdentity,
  Following,
  addOrganizationMember,
  filterFollowings,
  getOrganizationMembers,
  removeOrganizationMember,
} from 'src/core/api';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { AccountItem } from 'src/Nowruz/modules/general/components/avatarDropDown/avatarDropDown.types';
import { RootState } from 'src/store';
interface DropDownItem {
  label: string;
  value: string;
  icon?: ReactNode;
}
export const useOrgTeam = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );

  const [addedMembers, setAddedMembers] = useState<DropDownItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<AccountItem[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [toDeleteName, setToDeleteName] = useState('');
  const [toDeleteId, settoDeleteId] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTeamMembers = async () => {
    try {
      const res = await getOrganizationMembers(currentIdentity!.id, { page: 1 });
      const mapped = res.items?.map(item => {
        return {
          id: item.id,
          img: item.avatar?.url,
          type: 'users',
          name: `${item.first_name || ''} ${item.last_name || ''}`,
          username: item.username,
        };
      });
      setTeamMembers(mapped);
      setPage(1);
      setHasMore(true);
    } catch (e) {
      console.log('error in getting team members', e);
    }
  };

  const loadMore = async () => {
    try {
      if (hasMore) {
        const res = await getOrganizationMembers(currentIdentity!.id, { page: page + 1 });
        if (res.items?.length) {
          const mapped = res.items.map(item => {
            return {
              id: item.id,
              img: item.avatar?.url,
              type: 'users',
              name: `${item.first_name || ''} ${item.last_name || ''}`,
              username: item.username,
            };
          });
          setTeamMembers([...teamMembers, ...mapped]);
          setPage(page + 1);
        } else setHasMore(false);
      }
    } catch (e) {
      console.log('error in getting team members', e);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  const followingToOption = (followings: Following[]) => {
    return followings.map(i => ({
      label: JSON.stringify({ label: i.identity_meta.name || '', description: `@${i.identity_meta.username}` }),
      value: i.identity_meta.id,
      icon: <Avatar img={i.identity_meta.avatar} type="users" size="24px" />,
    }));
  };

  const searchMembers = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await filterFollowings({ name: searchText, type: 'users', page: 1, limit: 10 });
        const filtered = response.items.filter(item => !teamMembers.map(m => m.id).includes(item.identity_meta.id));
        cb(followingToOption(filtered));
      }
    } catch (error) {
      console.error('Error fetching following data:', error);
    }
  };

  const onSelectMember = member => {
    const members = addedMembers.filter(item => !item);
    members.push(member);
    setAddedMembers(members);
  };

  const handleAddAnother = () => {
    const members = [...addedMembers];
    members.push({ value: undefined, label: undefined });
    setAddedMembers(members);
  };

  const handleAddMembers = async () => {
    try {
      let members = [...addedMembers];
      members = members.filter(item => !!item.value);
      const uniqIds = [...new Set(members.map(item => item.value))];

      const requests = [];
      uniqIds.forEach(memberId => {
        requests.push(addOrganizationMember(currentIdentity!.id, memberId));
      });
      await Promise.all(requests);
      await getTeamMembers();
    } catch (e) {
      console.log('error in adding members', e);
    }
    setAddedMembers([]);
  };

  const handleClickDelete = (id: string, name: string) => {
    settoDeleteId(id);
    setToDeleteName(name);
    setOpenAlert(true);
  };

  const handleDelete = async () => {
    try {
      await removeOrganizationMember(currentIdentity!.id, toDeleteId);
      getTeamMembers();
      setOpenAlert(false);
    } catch (e) {
      console.log('error in deleting member', e);
    }
  };
  return {
    addedMembers,
    searchMembers,
    onSelectMember,
    handleAddAnother,
    handleAddMembers,
    teamMembers,
    handleDelete,
    openAlert,
    setOpenAlert,
    toDeleteName,
    handleClickDelete,
    getTeamMembers,
    loadMore,
    hasMore,
  };
};
