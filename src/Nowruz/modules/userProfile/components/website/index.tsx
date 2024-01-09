import { Typography } from '@mui/material';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
interface WebsiteProps {
  websiteUrl?: string;
}
export const Website: React.FC<WebsiteProps> = ({ websiteUrl }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="subtitle1" className="text-Gray-light-mode-600">
        Website
      </Typography>
      <a className="flex gap-2 items-center cursor-pointer" href={websiteUrl} target="_blank" rel="noreferrer">
        <Typography variant="h4" className="text-Brand-700">
          {websiteUrl}
        </Typography>
        <Icon fontSize={20} name="arrow-up-right" className="text-Brand-700" />
      </a>
    </div>
  );
};
