import { ProfileView } from 'src/components/molecules/profile-view/profile-view';

import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header: React.FC<HeaderProps> = ({ name, type, username, img, lastOnline, loading = false }) => {
  return (
    <div className={css.container}>
      <div className={css.title}>
        {!loading ? (
          <ProfileView img={img} type={type} size="2.5rem" name={name} username={username} location={lastOnline} />
        ) : (
          <div className={css.loading}>
            <div className={css.loader} />
            Loading...
          </div>
        )}
      </div>
      {/* <div>
        <img src="/icons/three-dots-blue.svg" />
      </div> */}
    </div>
  );
};
