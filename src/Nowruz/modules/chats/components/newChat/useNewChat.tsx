import { useEffect, useState } from 'react';
import { connectionStatus, filterFollowings } from 'src/core/api';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';

export const useNewChat = () => {
  const [selectedContact, setselectedContact] = useState();

  const searchFollowings = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const res = await filterFollowings({ name: searchText });
        const items = res.items.filter((i) => i.mutual && i.following);
        cb(
          items.map((i) => {
            const img = i.identity_meta.image || i.identity_meta.avatar || '';
            const type = i.identity_type;
            return {
              value: i.identity_meta.id,
              label: i.identity_meta.name,
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

  const onSelect = (value) => {
    setselectedContact(value);
  };

  return { searchFollowings, onSelect, selectedContact };
};
