import { get, post } from '../../../../core/http';
import { FollowingsReq, Pagination } from '../../../../core/types';
import { ContactItem } from '../../../molecules/contact-item/contact-item.types';

export async function getFollowings(payload: {
  page: number;
  name: string;
}): Promise<Pagination<FollowingsReq[]>> {
  return get(`follows/followings?page=${payload.page}&name=${payload.name}`).then(({ data }) => {
    return data;
  });
}

export async function postFind(payload: {
  participants: string[];
}): Promise<{ items: { id: string }[] }> {
  return post('chats/find', payload).then(({ data }) => data);
}

export function followingToContactListAdaptor(following: FollowingsReq): ContactItem {
  return {
    id: following.id,
    name: following.identity_meta.name,
    text: '',
    img: following.identity_meta.avatar,
    type: following.identity_type,
    date: '',
    date2: '',
    badge: '',
  };
}

export function convertFollowingsToContactList(followings: FollowingsReq[]): ContactItem[] {
  const mutualList = followings.filter((item) => item.mutual && item.following);
  return mutualList.map((item) => followingToContactListAdaptor(item));
}
