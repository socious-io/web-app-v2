import { Typography } from '@mui/material';

import css from './header.module.scss';
import { IntroHeaderProps } from './IntroHeader.types';

export const IntroHeader: React.FC<IntroHeaderProps> = ({ logo, title, description, subtitle }) => (
  <div className={css.container}>
    {logo}

    <h1 className={css.title}>{title}</h1>

    {!!description && <h2 className={css.subtitle}>{description}</h2>}
    {!!subtitle && <h2 className={css.subtitle}>{subtitle}</h2>}
  </div>
);
