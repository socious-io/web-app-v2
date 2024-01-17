import { Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Link } from 'src/Nowruz/modules/general/components/link';

import css from './website.module.scss';

export interface WebsiteProps {
  websiteUrl: string;
}
export const Website: React.FC<WebsiteProps> = ({ websiteUrl }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="subtitle1" className="text-Gray-light-mode-600">
        Website
      </Typography>

      <div className="flex gap-2 items-center">
        <Typography variant="h6">
          <Link
            href={website}
            label={website}
            color={variables.color_primary_700}
            customStyle={css.link}
            target="_blank"
          />
        </Typography>
        <Icon name="arrow-up-right" fontSize={20} color={variables.color_primary_700} />
      </div>
    </div>
  );
};
