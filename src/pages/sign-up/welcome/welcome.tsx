import React, { useContext, useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import css from './welcome.module.scss';
import { useNavigate } from '@tanstack/react-location';
export const Welcome: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  return (
    <div className={css['container']}>
      <Card className={css['card']}>
        {step === 0 ? (
          <>
            <div className={css['card__header']}>
              <div className={css['card__back']}>
                <img src="/icons/chevron-left.svg" />
              </div>
            </div>
            <div className={css['card__content']}>
              <img className={css.logo} src="/images/Logo-vertical.png" />
              <div className={css['card__title']}>Welcome to Socious</div>
              <div className={css['card__sub-title']}>
                To continue, please agree to our{' '}
                <a href="/terms-conditions" className={css['card__link']}>
                  terms of service
                </a>{' '}
                and{' '}
                <a href="/privacy-policy" className={css['card__link']}>
                  privacy policy
                </a>
              </div>
            </div>
            <div className={css['card__buttons']}>
              <Button onClick={() => setStep(1)}>I agree</Button>
            </div>
          </>
        ) : (
          <>
            <div className={css['card__header']}>
              <div className={css['card__back']}>
                <img src="/icons/chevron-left.svg" onClick={() => setStep(0)} />
              </div>
            </div>
            <div className={css['card__content']}>
              <div className={css['card__title']}>Congratulations</div>
              <div className={css['card__sub-title']}>You’ve successfully created an account</div>
            </div>
            <div className={css['card__buttons']}>
              <Button onClick={() => navigate({ to: '/sign-up/user/onboarding' })}>Complete your profile</Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
