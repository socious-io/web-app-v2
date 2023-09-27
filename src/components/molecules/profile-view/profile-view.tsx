import { CSSProperties } from 'react';

import css from './profile-view.module.scss';
import { ProfileViewProps } from './profile-view.types';
import { Avatar } from '../../atoms/avatar/avatar';

export const ProfileView = (props: ProfileViewProps): JSX.Element => {
  const { type, img, name, username, size = '3rem', location, theme = 'light' } = props;
  const navigate = {};

  function navigateToProfile() {
    if (type === 'users') {
      navigate({ to: `/profile/users/${username}/view` });
    } else {
      navigate({ to: `/profile/organizations/${username}/view` });
    }
  }

  function textStyles(): CSSProperties {
    if (props.width) {
      return {
        width: `calc(${props.width}px - ${size})`,
        textOverflow: 'ellipsis',
      };
    }
    return {};
  }

  return (
    <div className={css.container} style={{ width: props.width }} onClick={console.log}>
      <Avatar size={size} img={img} type={type} onClick={() => username && navigateToProfile()} />
      <div className={css.detail}>
        <div style={{ color: theme === 'dark' ? '#fff' : '' }} className={css.name}>
          {name}
        </div>
        <div style={{ color: theme === 'dark' ? '#fff' : '' }}>
          <div className={css.location} style={textStyles()}>
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};
