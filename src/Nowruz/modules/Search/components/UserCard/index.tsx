import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
// import { Socials } from 'src/Nowruz/modules/general/components/Socials';

import css from './user-card.module.scss';
import { UserCardProps } from './UserCard.typles';
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  console.log(user);
  return (
    <div className="h-full overflow-y-auto flex flex-col flex-1 text-center relative">
      <div className={css.gradient} />
      <div className={css.avatar}>
        <Avatar size="72px" type="users" img={user.image} iconSize={47} />
      </div>
      <div className="mt-14">
        <div className={css.title}>{user.title}</div>
        <div className={css.username}>{user.username}</div>
        <div className={css.bio}>{user.bio}</div>
      </div>

      {/* <div className="mt-4 mb-6">
        <Socials
          items={[
            { name: 'twitter', url: 'https://twitter.com' },
            { name: 'linkedin', url: 'https://twitter.com' },
          ]}
        />
      </div> */}
      <div className="flex justify-center gap-3">
        <Button color="secondary" variant="outlined">
          View profile
        </Button>
        <Button color="primary" variant="contained" startIcon={<Icon fontSize={20} name="plus" color="white" />}>
          Connect
        </Button>
      </div>
    </div>
  );
};
