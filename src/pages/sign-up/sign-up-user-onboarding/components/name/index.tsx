import React, { useContext, useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { Input } from 'src/components/atoms/input/input';

import css from './name.module.scss';
import { useUser } from '../../sign-up-user-onboarding.context';
import { StepsContext } from '../steper';
import StepHeader from '../stepHeader';

const Name: React.FC = () => {
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);

  return (
    <div className={css['container']}>
      <StepHeader className={css['header']} title="Let's get to know you!" subTitle="What should we call you " />
      <div className={css['form']}>
        <div className={css['filedsContainer']}>
          <Input
            name="first_name"
            placeholder="first name"
            onChange={(e) => updateUser({ ...state, first_name: e.target.value })}
            value={state.first_name}
          />
          <div className={css['last_name']}>
            <Input
              name="last_name"
              placeholder="last name"
              onChange={(e) => updateUser({ ...state, last_name: e.target.value })}
              value={state.last_name}
            />
          </div>
        </div>
      </div>
      <div className={css['buttons']}>
        <Button disabled={!(state.first_name && state.last_name)} onClick={() => updateSelectedStep(1)}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Name;
