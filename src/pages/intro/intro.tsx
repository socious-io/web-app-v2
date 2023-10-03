import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';
import { Steps } from 'src/components/atoms/steps-v2/steps';
import { Typography } from 'src/components/atoms/typography/typography';
import { BottomStatic } from 'src/components/templates/bottom-static/bottom-static';
import { RootState } from 'src/store';

import { list } from './intro.constants';
import css from './intro.module.scss';

export const Intro = (): JSX.Element => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const status = useSelector((state: RootState) => state.identity.status);

  if (status === 'succeeded') return <Navigate to="/jobs" />;

  if (status === 'loading') {
    return <div></div>;
  }

  return (
    <BottomStatic backgroundColor="var(--color-off-white-01)">
      <div className={css.sliderContainer}>
        <Typography textAlign="center" size="xl" type="heading">
          {list[step - 1].title}
        </Typography>
        <img src={list[step - 1].img} />
        <Typography fontSize={18} color="var(--color-gray-01)" textAlign="center">
          {list[step - 1].description}
        </Typography>
        <Steps autoPlay length={list.length} current={step} onStepClick={setStep} />
      </div>
      <div className={css.buttonContainer}>
        <Button onClick={() => navigate('/sign-up/user/email')} color="blue">
          Join now
        </Button>
        <Button onClick={() => navigate('/sign-in')} color="white">
          Sign in
        </Button>
      </div>
    </BottomStatic>
  );
};
