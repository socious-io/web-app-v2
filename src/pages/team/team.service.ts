import { ContactItem } from 'src/components/molecules/contact-item/contact-item.types';
import { FollowingsReq } from 'src/core/types';

export function followingToContactListAdaptor(following: FollowingsReq): ContactItem {
  return {
    id: following.identity_id,
    name:
      following.identity_meta.name ||
      following.identity_meta.username ||
      (following.identity_meta?.shortname as string),
    text: '',
    img: following.identity_meta.avatar || (following.identity_meta?.image as string),
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
