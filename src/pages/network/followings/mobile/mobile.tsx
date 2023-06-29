import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { Header } from 'src/components/atoms/header/header';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Button } from 'src/components/atoms/button/button';
import { UnfollowModal } from '../unfollow-modal';
import { printWhen } from 'src/core/utils';
import { useFollowingsShared } from '../followings.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const navigate = useNavigate();
  const { followings, followStatusUser, onUnfollow, onFollow, loadMore, onProfileClick } = useFollowingsShared();
  const [selectedUser, setSelectedUser] = useState({ name: '', id: '' });

  const followingsListJSX = (
    <>
      <div className={css.followings}>
        {followings?.items.map((list) => (
          <div key={list.id} className={css.followings__item}>
            <div className={css.followings__avatar}>
              <Avatar
                img={list.identity_meta.avatar || list.identity_meta?.image}
                type={list.identity_type}
                onClick={() => {
                  const profileUsername = list.identity_meta.username || list.identity_meta?.shortname;
                  profileUsername && onProfileClick(list.identity_type, profileUsername);
                }}
              />
              {list.identity_meta.name}
            </div>
            <Button
              size="s"
              width="6.5rem"
              color={followStatusUser(list.identity_id) ? 'blue' : 'white'}
              onClick={() =>
                followStatusUser(list.identity_id)
                  ? setSelectedUser({ name: list.identity_meta.name, id: list.identity_id })
                  : onFollow(list.identity_id)
              }
            >
              {followStatusUser(list.identity_id) ? 'Following' : 'Follow'}
            </Button>
          </div>
        ))}
      </div>
      {printWhen(
        <div className={css.seeMore} onClick={loadMore}>
          See more
        </div>,
        followings?.total_count > followings?.items.length
      )}
    </>
  );

  return (
    <div>
      <Header onBack={() => navigate({ to: '/network' })} paddingTop={'var(--safe-area)'} title="Following" />
      {followings?.total_count ? followingsListJSX : <div className={css.noFollowing}>No Following</div>}
      <UnfollowModal
        open={!!selectedUser.id}
        onClose={() => setSelectedUser({ ...selectedUser, id: '' })}
        selectedUserName={selectedUser.name}
        onUnfollow={() => {
          onUnfollow(selectedUser.id);
          setSelectedUser({ ...selectedUser, id: '' });
        }}
      />
    </div>
  );
};
