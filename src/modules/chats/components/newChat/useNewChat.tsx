import { useState } from 'react';
import { filterFollowings } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';

export const useNewChat = () => {
  const [selectedContact, setselectedContact] = useState<{ value: string; label: string }>();

  const searchFollowings = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const res = await filterFollowings({ name: searchText });
        const items = res.items.filter(i => i.mutual || i.following);

        const transformedItems = items.map(i => {
          const { profileImage, name, type } = getIdentityMeta(i);
          return {
            value: i.identity_meta?.id,
            label: name,
            icon: profileImage ? (
              <img src={profileImage} width={24} height={24} alt="" className="rounded-2xl" />
            ) : (
              <Avatar type={type || 'users'} size="24px" iconSize={18} />
            ),
          };
        });

        cb(transformedItems);
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
