import { Stepper as MUIStepper, Step, StepConnector, StepLabel, Typography, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Mail01 } from 'public/icons/nowruz/mail-01';
import { Passcode } from 'public/icons/nowruz/passcode';
import { Start02 } from 'public/icons/nowruz/star-02';
import { User01 } from 'public/icons/nowruz/user-01';
import variables from 'src/components/_exports.module.scss';

import css from './stepper.module.scss';
import { StepperProps } from './stepper.types';

export const Stepper: React.FC<StepperProps> = ({ activeStep }) => {
  const steps = [
    { title: 'Email verification', desc: 'Please check your email', icon: '/icons/nowruz/mail-01.svg' },
    { title: 'Choose a password', desc: 'Choose a secure password', icon: '/icons/nowruz/passcode.svg' },
    { title: 'Your details', desc: 'Enter your name', icon: '/icons/nowruz/user-01.svg' },
    { title: 'Congartulations', desc: 'Start making an impact', icon: '/icons/nowruz/star-02.svg' },
  ];

  const activeColor = variables.color_grey_700;
  const disabledColor = variables.color_grey_300;

  function getIcon(stepNumber: number) {
    switch (stepNumber) {
      case 0:
        return <Mail01 stroke={stepNumber <= activeStep ? activeColor : disabledColor} />;
      case 1:
        return <Passcode stroke={stepNumber <= activeStep ? activeColor : disabledColor} />;
      case 2:
        return <User01 stroke={stepNumber <= activeStep ? activeColor : disabledColor} />;
      case 3:
        return <Start02 stroke={stepNumber <= activeStep ? activeColor : disabledColor} />;
    }
  }

  function stepIcon(stepNumber: number) {
    return <div className={css.iconDiv}>{getIcon(stepNumber)}</div>;
  }

  const CustomizedStepConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 20,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: activeColor,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: activeColor,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 2,
      border: 0,
      backgroundColor: disabledColor,
      borderRadius: 1,
    },
  }));

  return (
    <MUIStepper alternativeLabel activeStep={activeStep} connector={<CustomizedStepConnector />}>
      {steps.map((item, index) => (
        <Step key={item.title}>
          <StepLabel StepIconComponent={() => stepIcon(index)}>
            {
              <div className={css.titleDiv}>
                <Typography variant="subtitle2">{item.title}</Typography>
                <Typography variant="caption">{item.desc}</Typography>
              </div>
            }
          </StepLabel>
        </Step>
      ))}
    </MUIStepper>
  );
};
