import { Typography } from '@mui/material';
import React from 'react';
import { translate } from 'src/core/utils';
import { Icon } from 'src/modules/general/components/Icon';
import { Link } from 'src/modules/general/components/link';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './website.module.scss';

export interface WebsiteProps {
  url: string;
  truncate?: boolean;
}
export const Website: React.FC<WebsiteProps> = ({ url, truncate = false }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="subtitle1" className="text-Gray-light-mode-600">
        {translate('job-website')}
      </Typography>

      <div className="flex gap-2 items-center">
        <Typography variant="h6" className={truncate ? 'truncate' : ''}>
          <Link href={url} label={url} color={variables.color_primary_700} customStyle={css.link} target="_blank" />
        </Typography>
        <Icon name="arrow-up-right" fontSize={20} color={variables.color_primary_700} />
      </div>
    </div>
  );
};
