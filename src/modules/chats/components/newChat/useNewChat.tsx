import { useEffect, useState } from 'react';
import { OrgMeta, UserMeta, connectionStatus, filterFollowings } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';

export const useNewChat = () => {
  const [selectedContact, setselectedContact] = useState<{ value: string; label: string }>();

  const searchFollowings = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const res = await filterFollowings({ name: searchText });
        const items = res.items.filter(i => i.mutual && i.following);
        cb(
          items.map(i => {
            const { profileImage, name, type } = getIdentityMeta(i);
            const img = profileImage;
            return {
              value: i.identity_meta?.id,
              label: name,
              icon: img ? (
                <img src={img} width={24} height={24} alt="" className="rounded-2xl" />
              ) : (
                <Avatar type={type} size="24px" iconSize={18} />
              ),
            };
          }),
        );
      }
    } catch (error) {
      console.error('Error fetching followings', error);
    }
  };

  const onSelect = value => {
    setselectedContact(value);
  };

  return { searchFollowings, onSelect, selectedContact };
};
