import React from 'react';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';

import css from './user-card.module.scss';
import { UserCardProps } from './UserCard.typles';
import { useUserCard } from './useUserCard';
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { viewProfile } = useUserCard();
  return (
    <div className={`h-full overflow-y-auto flex flex-col flex-1 text-center relative pb-6 ${css.container}`}>
      <div className={css.gradient} />
      <div className={css.avatar}>
        <Avatar hasBorder isVerified={user.isVerified} size="72px" type="users" img={user.image} iconSize={47} />
      </div>
      <div className="mt-12">
        <Chip
          startIcon={<div className={css.dotIcon} />}
          label={user.type === 'users' ? 'Available for work' : 'Hiring'}
          theme="secondary"
          shape="sharp"
        />
      </div>
      <div className="mt-4">
        <div className={css.title}>{user.title}</div>
        <div className={css.username}>{user.username}</div>
        <div className={css.bio}>{user.bio}</div>
      </div>
      <div className="flex justify-center gap-3">
        <Button
          style={{ fontSize: '14px', padding: '10px 16px' }}
          color="primary"
          variant="contained"
          customStyle={css.buttons}
          onClick={() => viewProfile(user.type, user.username)}
        >
          View profile
        </Button>
      </div>
    </div>
  );
};
