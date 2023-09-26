import React, { useContext, useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import css from './welcome.module.scss';

export const Welcome: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = {};
  return (
    <div className={css['container']}>
      <Card className={css['card']}>
        <div className={css['card__header']}></div>
        <div className={css['card__content']}>
          <div className={css['card__title']}>Congratulations</div>
          <div className={css['card__sub-title']}>You’ve successfully created an account</div>
        </div>
        <div className={css['card__buttons']}>
          <Button onClick={() => navigate({ to: '/sign-up/user/onboarding' })}>Complete your profile</Button>
        </div>
      </Card>
    </div>
  );
};
