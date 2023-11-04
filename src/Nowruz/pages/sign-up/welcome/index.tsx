import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './welcome.module.scss';
export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-md py-5 px-4">
        <Typography variant="body1" align="center" mb={4}>
          Welcome to Socious
        </Typography>
        <Typography variant="h5" align="center" className={css.subtitle} mb={5}>
          You’re about to embark on a journey paved with opportunities to make a real impact. With Socious, turns your
          ambitions and dreams into real-world change.
        </Typography>
        <img src="/images/welcome.svg" />
        <Typography variant="h5" align="center" className={css.subtitle} mb={6}>
          Complete your profile to find impact jobs
        </Typography>
        <Button color="primary" block onClick={() => navigate('/sign-up/user/onboarding')}>
          Continue
        </Button>
      </div>
    </div>
  );
};
