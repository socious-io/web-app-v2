import css from './intro.module.scss';
import { useNavigate } from 'react-router-dom';
import { Steps } from '../../components/atoms/steps-v2/steps';
import { list } from './intro.constants';
import { Typography } from '../../components/atoms/typography/typography';
import { Button } from '../../components/atoms/button/button';
import { BottomStatic } from '../../components/templates/bottom-static/bottom-static';
import { useState } from 'react';

export const Intro = (): JSX.Element => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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
