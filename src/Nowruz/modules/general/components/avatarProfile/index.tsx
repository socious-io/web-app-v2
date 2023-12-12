import largeTick from 'public/icons/nowruz/verified-tick-lg.svg';
import mediumTick from 'public/icons/nowruz/verified-tick-md.svg';
import smallTick from 'public/icons/nowruz/verified-tick-sm.svg';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './avatarProfile.module.scss';
import { AvatarProfileProps } from './avatarProfile.types';

export const AvatarProfile: React.FC<AvatarProfileProps> = (props) => {
  const { size, imgUrl, type, verified = false, text, handleClick } = props;
  const verifiedTick = size === 'small' ? smallTick : size === 'medium' ? mediumTick : largeTick;
  const getContent = () => {
    if (imgUrl) return <img className={css.imgContainer} src={imgUrl} alt="" />;
    if (text) {
      if (size === 'small') return <span className={css.textSm}>{text}</span>;
      if (size === 'medium') return <span className={css.textMd}>{text}</span>;
      if (size === 'large') return <span className={css.textLg}>{text}</span>;
    }
    if (type === 'users') {
      if (size === 'small')
        return (
          <Icon
            name="user-01"
            fontSize={36}
            color={variables.color_grey_600}
            className="!cursor-pointer"
            containerClass="cursor-pointer"
          />
        );
      if (size === 'medium')
        return (
          <Icon
            name="user-01"
            fontSize={48}
            color={variables.color_grey_600}
            className="!cursor-pointer"
            containerClass="cursor-pointer"
          />
        );
      if (size === 'large')
        return (
          <Icon
            name="user-01"
            fontSize={80}
            color={variables.color_grey_600}
            className="!cursor-pointer"
            containerClass="cursor-pointer"
          />
        );
    }
    if (type === 'organizations') {
      if (size === 'small') return <Icon name="building-01" fontSize={36} color={variables.color_grey_600} />;
      if (size === 'medium') return <Icon name="building-01" fontSize={48} color={variables.color_grey_600} />;
      if (size === 'large') return <Icon name="building-01" fontSize={80} color={variables.color_grey_600} />;
    }
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
