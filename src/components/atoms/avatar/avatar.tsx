import { CSSProperties } from 'react';

import css from './avatar.module.scss';
import { AvatarProps } from './avatar.types';

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { badge, customStyle = '', size = '3rem', onClick, type = 'users', img, ...rest } = props;

  const images: Record<AvatarProps['type'], string> = {
    organizations: '/icons/organization.svg',
    users: '/icons/user.svg',
  };

  const style: CSSProperties = {
    ...rest,
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    backgroundImage: `url(${images[type]})`,
  };
  return (
    <div
      onClick={props.onClick}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      className={`${css.container} ${customStyle}`}
    >
      <div onClick={props.onClick} style={style} className={css.imageContainer}>
        {img && <img className={css.img} src={img} />}
      </div>
      {badge && (
        <div className={css.badge} style={{ backgroundColor: badge.color, width: badge.width, height: badge.height }}>
          <img className={css.img} src={badge.image} />
        </div>
      )}
    </div>
  );
};
