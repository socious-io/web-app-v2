import React, { useContext, useState } from 'react';
import StepHeader from '../stepHeader';
import css from './phone-number.module.scss';
import { Button } from 'src/components/atoms/button/button';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { Input } from 'src/components/atoms/input/input';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { useUser } from '../../sign-up-user-onboarding.context';
import { StepsContext } from '../steper';

const PhoneNumber: React.FC = () => {
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);

  return (
    <div className={css['container']}>
      <StepHeader
        className={css['header']}
        title="What’s your phone number?"
        subTitle="Share your phone number with organisations you’d  like to work together with"
      />
      <div className={css['form']}>
        <div className={css['phoneContainer']}>
          <Dropdown
            defaultValue={state.mobile_country_code}
            name="mobile_country_code"
            placeholder="+1"
            list={COUNTRY_CODES}
            onValueChange={({ value }) => updateUser({ ...state, mobile_country_code: value })}
          />
          <Input
            name="phone"
            placeholder="phone"
            onChange={(e) => updateUser({ ...state, phone: e.target.value })}
            value={state.phone}
          />
        </div>
      </div>
      <div className={css['buttons']}>
        <Button
          disabled={!(state.phone !== '' && state.mobile_country_code !== '')}
          onClick={() => updateSelectedStep(5)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PhoneNumber;
