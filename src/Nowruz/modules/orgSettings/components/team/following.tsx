import { Following } from 'src/core/api';

import { ContactItem } from './contact-item.types';


export function followingToContactListAdaptor(following: Following): ContactItem {
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

export function convertFollowingsToContactList(followings: Following[]): ContactItem[] {
    const mutualList = followings.filter((item) => item.mutual && item.following);
    return mutualList.map((item) => followingToContactListAdaptor(item));
}