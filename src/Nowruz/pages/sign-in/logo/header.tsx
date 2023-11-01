import { Typography } from '@mui/material';
import { Logo } from 'public/icons/nowruz/logo';

import css from './header.module.scss';

export const Header = () => {
  return (
    <div className={css.container}>
      <Logo width={48} height={48} />
      <Typography variant="body1" align="center" className={css.title}>
        Log in to your account
      </Typography>
      <Typography variant="h5" align="center" className={css.subtitle}>
        Welcome back! Please enter your details.
      </Typography>
    </div>
  );
};
