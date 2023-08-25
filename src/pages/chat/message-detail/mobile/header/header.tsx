import { ProfileView } from '@molecules/profile-view/profile-view';
import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header = (props: HeaderProps): JSX.Element => {
  const { onBack, type, name, username, img, lastOnline } = props;

  return (
    <div onClick={onBack} className={css.container}>
      <img className={css.img} src="/icons/chevron-left.svg" />
      <div className={css.title}>
        <ProfileView img={img} type={type} size="2.5rem" name={name} username={username} location={lastOnline} />
      </div>
    </div>
  );
};
