import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { Search } from 'src/components/atoms/search/search';

import css from './mobile.module.scss';
import { useNetworkShared } from '../network.shared';

export const Mobile: React.FC = () => {
  const { navigateNetwork, identity } = useNetworkShared();
  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.menu}>
          <Avatar size="2.25rem" type={identity?.type} img={avatarImg} />
          <Search placeholder="Search network" />
          <div>
            <img className={css.logo} src="icons/chat-white.svg" />
          </div>
        </div>
        <div>
          <div className={css.title}>People</div>
          <div className={css.tagline}>Connect with skilled professionals</div>
        </div>
      </div>
      <Card className={css.network}>
        <div className={css.network__item} onClick={() => navigateNetwork('connections')}>
          <div className={css.network__logo}>
            <img src="/icons/network.svg" />
          </div>
          Connections
        </div>
        <div className={css.network__item} onClick={() => navigateNetwork('followings')}>
          <div className={css.network__logo}>
            <img src="/icons/followers-blue.svg" />
          </div>
          Following
        </div>
      </Card>
      <div className={css.recommand}>
        <div className={css.recommand__noItem}>No recommendations</div>
      </div>
    </div>
  );
};
