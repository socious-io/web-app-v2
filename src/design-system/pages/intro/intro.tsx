import css from './intro.module.scss';
import { Steps } from '../../atoms/steps/steps';
import { list } from './intro.constants';
import { Typography } from '../../atoms/typography/typography';
import { Button } from '../../atoms/button/button';
import { BottomStatic } from '../../templates/bottom-static/bottom-static';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';

export const Intro = (): JSX.Element => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const item = list[step - 1];
  return (
    <BottomStatic backgroundColor="var(--color-off-white-01)">
      <div className={css.sliderContainer}>
        <Typography textAlign="center" size="xl" type="heading">
          {item.title}
        </Typography>
        <img src={item.img} />
        <Typography
          fontSize={18}
          color="var(--color-gray-01)"
          textAlign="center"
        >
          {item.description}
        </Typography>
        <Steps
          autoPlay
          length={list.length}
          current={step}
          onStepClick={setStep}
        />
      </div>
      <div className={css.buttonContainer}>
        <Button onClick={() => navigate({ to: '/sign-up' })} color="blue">
          Join now
        </Button>
        <Button
        onClick={() => navigate({ to: '/sign-in' })}
        color="white">Sign in</Button>
      </div>
    </BottomStatic>
  );
};
