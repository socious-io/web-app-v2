import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { CurrentIdentity } from 'src/core/api';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store';

import css from './profile-card.module.scss';

export const ProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  function navigateToProfile() {
    if (identity.type === 'users') {
      navigate(`/profile/users/${identity.meta.username}/view`);
    } else {
      navigate(`/profile/organizations/${identity?.meta.shortname}/view`);
    }
  }

  function getAvatarUrl(identity: IdentityReq) {
    if (identity && identity.type === 'organizations') {
      return identity.meta.image;
    } else {
      return identity.meta.avatar;
    }
  }

  return (
    <Card>
      <div className={css.profileHeader}>
        <Avatar img={getAvatarUrl(identity)} type={identity.type} />
        <div>
          <div className={css.username}>{identity.name}</div>
          <div onClick={navigateToProfile} className={css.profileLink}>
            View my profile
          </div>
        </div>
      </div>
      <div className={css.profileFooter}>
        <div className={css.connections}>Connections</div>
        <div className={css.followers}>Followers</div>
      </div>
    </Card>
  );
};
