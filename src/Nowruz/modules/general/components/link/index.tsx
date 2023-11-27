import { Link as MuiLink } from '@mui/material';
import React from 'react';

import css from './link.module.scss';
import { LinkProps } from './link.types';

export const Link: React.FC<LinkProps> = (props) => {
  const { label, href, customStyle } = props;
  return (
    <MuiLink underline="hover" className={`${css.link} ${customStyle}`} href={href}>
      {label}
    </MuiLink>
  );
};
