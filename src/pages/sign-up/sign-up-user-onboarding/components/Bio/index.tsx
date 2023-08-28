import React, { useContext, useState } from 'react';
import StepHeader from '../stepHeader';
import css from './bio.module.scss';
import { Button } from 'src/components/atoms/button/button';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { Input } from 'src/components/atoms/input/input';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { useUser } from '../../sign-up-user-onboarding.context';
import { StepsContext } from '../steper';

const Bio: React.FC = () => {
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);

  const setBio = (bio: string) => {
    if (bio.length <= 160) updateUser({ bio });
  };
  return (
    <div className={css['container']}>
      <StepHeader
        className={css['header']}
        title="Tell us about who you are"
        subTitle="Highlight who you are in 160 characters or less"
      />
      <div className={css['form']}>
        <Textarea value={state.bio} onChange={(e) => setBio(e.target.value)} placeholder="Write biography" />
        <div className={css['counter']}>{`${state.bio.length}/160`}</div>
      </div>
      <div className={css['buttons']}>
        <Button disabled={state.bio === ''} onClick={() => updateSelectedStep(6)}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Bio;
