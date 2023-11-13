import { Typography } from '@mui/material';

import css from './header.module.scss';
import { IntroHeaderProps } from './IntroHeader.types';

export const IntroHeader: React.FC<IntroHeaderProps> = ({ logo, title, description, subtitle }) => (
  <div className={css.container}>
    {logo}
    <Typography variant="h3" align="center" className={css.title}>
      {title}
    </Typography>
    <Typography variant="h5" align="center" className={css.subtitle}>
      {description}
    </Typography>
    {!!subtitle && (
      <Typography variant="h5" align="center" className={css.subtitle}>
        {subtitle}
      </Typography>
    )}
  </div>
);
