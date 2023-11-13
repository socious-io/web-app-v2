import { CSSProperties } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './avatar.module.scss';
import { AvatarProps } from './avatar.types';

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { badge, customStyle = '', size = '3rem', onClick, type = 'users', img, iconName, ...rest } = props;
  const icon = iconName || type === 'users' ? 'user-01' : 'building-05';
  const style: CSSProperties = {
    ...rest,
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
  };
  return (
    <div
      onClick={props.onClick}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      className={`${css.container} ${customStyle}`}
    >
      <div onClick={props.onClick} style={style} className={css.imageContainer}>
        {img ? (
          <img className={css.img} src={img} alt="" />
        ) : (
          <Icon name={icon} fontSize={24} color={variables.color_grey_600} />
        )}
      </div>
      {badge && (
        <div className={css.badge} style={{ backgroundColor: badge.color, width: badge.width, height: badge.height }}>
          <img className={css.img} src={badge.image} alt="" />
        </div>
      )}
    </div>
  );
};
