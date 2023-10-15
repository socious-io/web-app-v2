import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  addOrganizationMember,
  CurrentIdentity,
  filterFollowings,
  getOrganizationMembers,
  MembersRes,
  removeOrganizationMember,
} from 'src/core/api';
import { UserType } from 'src/core/types';
import { RootState } from 'src/store';

import { convertFollowingsToContactList } from './team.service';
import { Resolver } from './team.type';

export const useTeamShared = () => {
  const navigate = useNavigate();
  const { members, followings } = (useLoaderData() as Resolver) || {};
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const initialMemberList = convertFollowingsToContactList(followings?.items);
  const [updateMembers, setUpdateMembers] = useState<MembersRes>(members);
  const [openModal, setOpenModal] = useState<{
    name: 'member' | 'remove' | '';
    open: boolean;
    identity?: { id: string; name: string };
  }>({
    name: '',
    open: false,
    identity: { id: '', name: '' },
  });
  const [memberList, setMemberList] = useState(initialMemberList);

  function navigateToMemberProfile(username: string) {
    navigate(`/profile/users/${username}/view`);
  }

  function getNewFollowings(name: string) {
    filterFollowings({ name, type: 'users' as UserType })
      .then(({ items }) => convertFollowingsToContactList(items))
      .then(setMemberList);
  }

  function onSeeMoreClick() {
    getOrganizationMembers(identity!.id, { page: updateMembers.page + 1 }).then((res) =>
      setUpdateMembers({ ...updateMembers, ...res, items: [...updateMembers.items, ...res.items] }),
    );
  }

  function onSearchMember(value: string) {
    getNewFollowings(value);
  }

  function onAddMember(user_id: string) {
    addOrganizationMember(identity!.id, user_id).then(() => {
      getOrganizationMembers(identity!.id, { page: updateMembers.page }).then(setUpdateMembers);
      getNewFollowings('');
    });
  }

  function onRemoveUser(user_id: string) {
    removeOrganizationMember(identity!.id, user_id).then(() => {
      getOrganizationMembers(identity!.id, { page: updateMembers.page }).then(setUpdateMembers);
      getNewFollowings('');
    });
  }

  return {
    updateMembers,
    identity,
    navigateToMemberProfile,
    onSeeMoreClick,
    openModal,
    setOpenModal,
    onSearchMember,
    memberList,
    onAddMember,
    onRemoveUser,
  };
};
