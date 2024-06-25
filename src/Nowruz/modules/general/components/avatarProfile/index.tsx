import largeTick from 'public/icons/nowruz/verified-tick-lg.svg';
import mediumTick from 'public/icons/nowruz/verified-tick-md.svg';
import smallTick from 'public/icons/nowruz/verified-tick-sm.svg';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './avatarProfile.module.scss';
import { AvatarProfileProps } from './avatarProfile.types';

export const AvatarProfile: React.FC<AvatarProfileProps> = props => {
  const { size, imgUrl, type, verified = false, text, handleClick } = props;
  const verifiedTick = size === 'small' ? smallTick : size === 'medium' ? mediumTick : largeTick;
  const iconSizes = [
    { size: 'small', iconSize: 36 },
    { size: 'medium', iconSize: 48 },
    { size: 'large', iconSize: 80 },
  ];
  const getContent = () => {
    if (imgUrl) return <img className={css.imgContainer} src={imgUrl} alt="" />;
    if (text) {
      return <span className={css[`text-${size}`]}>{text}</span>;
    }
    return (
      <Icon
        name={type === 'users' ? 'user-01' : 'building-05'}
        fontSize={iconSizes.find(item => item.size === size)?.iconSize}
        color={variables.color_grey_600}
        className="!cursor-pointer"
        containerClass="cursor-pointer"
      />
    );
  };
  return (
    <div
      className={size === 'small' ? `${css.sm}` : size === 'medium' ? `${css.md}` : `${css.lg}`}
      onClick={handleClick}
    >
      {getContent()}
      {verified && <img src={verifiedTick} alt="" className={css.tick} />}
    </div>
  );
};
