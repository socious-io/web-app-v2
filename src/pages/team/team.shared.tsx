import { useState } from 'react';
import { useSelector } from 'react-redux';
import { endpoint } from 'src/core/endpoints';
import { IdentityReq, MemberIdentity, Pagination, UserType } from 'src/core/types';
import { RootState } from 'src/store/store';

import { convertFollowingsToContactList } from './team.service';
import { Resolver } from './team.type';

export const useTeamShared = () => {
  const navigate = {};
  const { members, followings } = (useMatch().ownData as Resolver) || {};
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const initialMemberList = convertFollowingsToContactList(followings?.items);
  const [updateMembers, setUpdateMembers] = useState<Pagination<MemberIdentity[]>>(members);
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
    navigate({ to: `/profile/users/${username}/view` });
  }

  function getNewFollowings(name: string) {
    const payload = { name, type: 'users' as UserType };
    endpoint.get.follows['followings'](payload)
      .then(({ items }) => convertFollowingsToContactList(items))
      .then(setMemberList);
  }

  function onSeeMoreClick() {
    endpoint.get.members['org_id'](identity.id, { page: updateMembers.page + 1 }).then((res) =>
      setUpdateMembers({ ...updateMembers, ...res, items: [...updateMembers.items, ...res.items] })
    );
  }

  function onSearchMember(value: string) {
    getNewFollowings(value);
  }

  function onAddMember(user_id: string) {
    endpoint.post.members['{org_id}/add/{user_id}'](identity.id, user_id).then(() => {
      endpoint.get.members['org_id'](identity.id, { page: updateMembers.page }).then(setUpdateMembers);
      getNewFollowings('');
    });
  }

  function onRemoveUser(user_id: string) {
    endpoint.post.members['{org_id}/remove/{user_id}'](identity.id, user_id).then(() => {
      endpoint.get.members['org_id'](identity.id, { page: updateMembers.page }).then(setUpdateMembers);
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
