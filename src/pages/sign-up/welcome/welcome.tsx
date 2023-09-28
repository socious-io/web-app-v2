import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';

import css from './welcome.module.scss';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={css['container']}>
      <Card className={css['card']}>
        <div className={css['card__header']}></div>
        <div className={css['card__content']}>
          <div className={css['card__title']}>Congratulations</div>
          <div className={css['card__sub-title']}>You’ve successfully created an account</div>
        </div>
        <div className={css['card__buttons']}>
          <Button onClick={() => navigate('/sign-up/user/onboarding')}>Complete your profile</Button>
        </div>
      </Card>
    </div>
  );
};
