import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { CurrentIdentity, OrgMeta, UserMeta } from 'src/core/api';
import { RootState } from 'src/store';

import css from './profile-card.module.scss';

export const ProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  function navigateToProfile() {
    if (!identity) return;
    if (identity && identity?.type === 'users') {
      navigate(`/profile/users/${(identity.meta as UserMeta).username}/view`);
    } else {
      navigate(`/profile/organizations/${(identity.meta as OrgMeta).shortname}/view`);
    }
  }

  function getAvatarUrl(identity: CurrentIdentity) {
    if (identity.type === 'organizations') {
      return (identity.meta as OrgMeta).image;
    } else {
      return (identity.meta as UserMeta).avatar;
    }
  }

  return (
    <Card>
      <div className={css.profileHeader}>
        {identity && <Avatar img={getAvatarUrl(identity)} type={identity.type} />}
        <div>
          <div className={css.username}>{identity?.meta.name}</div>
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
