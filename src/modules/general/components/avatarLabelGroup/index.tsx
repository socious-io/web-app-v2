import { Typography } from '@mui/material';
import React from 'react';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import variables from 'src/styles/constants/_exports.module.scss';

import { AvatarLabelGroupProps } from './avatarLabelGroup.types';

export const AvatarLabelGroup: React.FC<AvatarLabelGroupProps> = ({
  account,
  avatarSize,
  removeFull = false,
  justAvatarClickable = false,
  handleClick,
  customStyle = '',
  isVerified = false,
}) => {
  const nonFull = removeFull ? '' : 'w-full';

  return (
    <div
      className={`${nonFull} h-fit flex items-center gap-3 py-3 px-4 ${customStyle} ${handleClick && !justAvatarClickable && 'cursor-pointer'}`}
      onClick={e => !justAvatarClickable && handleClick?.(e)}
    >
      <Avatar
        img={account?.img || ''}
        type={account.type}
        size={avatarSize || '40px'}
        onClick={e => justAvatarClickable && handleClick?.(e)}
        isVerified={isVerified}
      />
      <div className="flex flex-col">
        <Typography variant="subtitle2" color={variables.color_grey_900}>
          {account.name}
        </Typography>
        <Typography variant="caption" color={variables.color_grey_600}>
          {account.username.includes('@') ? account.username : `@${account.username}`}
        </Typography>
      </div>
    </div>
  );
};
