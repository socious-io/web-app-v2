import { Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';

import { AvatarLabelGroupProps } from './avatarLabelGroup.types';

export const AvatarLabelGroup: React.FC<AvatarLabelGroupProps> = (props) => {
  const { img, type, name, username, customStyle } = props;
  return (
    <div className={`w-full h-fit flex flex-row gap-3 py-3 px-4 ${customStyle}`}>
      <Avatar img={img} type={type} />
      <div className="flex flex-col">
        <Typography variant="subtitle2" color={variables.color_grey_900}>
          {name}
        </Typography>
        <Typography variant="caption" color={variables.color_grey_600}>
          {username}
        </Typography>
      </div>
    </div>
  );
};
