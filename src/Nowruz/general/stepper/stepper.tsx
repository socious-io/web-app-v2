import { Stepper as MUIStepper, Step, StepConnector, StepLabel, Typography, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import variables from 'src/components/_exports.module.scss';

import css from './stepper.module.scss';
import { StepperProps } from './stepper.types';
import { StepperIconWrapper } from './stepperIcon';

export const Stepper: React.FC<StepperProps> = (props) => {
  const { activeStep, orientation, steps } = props;
  const dir = orientation ? orientation : 'horizontal';

  const activeColor = variables.color_grey_700;
  const disabledColor = variables.color_grey_300;

  const HorizontalStepConnector = styled(StepConnector)(() => ({
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

  const VerticalStepConnector = styled(StepConnector)(() => ({
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
      marginLeft: 8,
      width: 2,
      border: 0,
      backgroundColor: disabledColor,
      borderRadius: 1,
    },
  }));

  return (
    <MUIStepper
      alternativeLabel={dir === 'horizontal'}
      activeStep={activeStep}
      orientation={dir}
      connector={dir === 'horizontal' ? <HorizontalStepConnector /> : <VerticalStepConnector />}
    >
      {steps.map((item, index) => (
        <Step key={item.title}>
          <StepLabel
            StepIconComponent={() => (
              <StepperIconWrapper
                step={index}
                activeStep={activeStep}
                activeColor={activeColor}
                disabledColor={disabledColor}
                Component={item.icon}
              />
            )}
          >
            {
              <div className={dir === 'horizontal' ? css.titleDivHorizontal : css.titleDivVertical}>
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
