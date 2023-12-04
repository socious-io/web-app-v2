import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './user-card.module.scss';
import { UserCardProps } from './UserCard.typles';

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  console.log(user);
  return (
    <div className="h-full overflow-y-auto flex flex-col flex-1 text-center">
      <div className={css.gradient}></div>
      <div className={css.title}>{user.title}</div>
      <div className={css.username}>{user.username}</div>
      <div className={css.bio}>{user.bio}</div>
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
