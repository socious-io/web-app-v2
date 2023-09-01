// this page has not been implemented
import React, { useState } from 'react';
import StepHeader from '../stepHeader';
import css from './available-for-jobs.module.scss';
import { Button } from 'src/components/atoms/button/button';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';

const AvailableForJobs: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState('1');

  return (
    <div className={css['container']}>
      <StepHeader
        className={css['header']}
        title="Are you available for jobs?"
        subTitle="Connect with other like-minded individuals and organizations around you"
      />
      <div className={css['form']}>
        <RadioGroup
          name="jobs"
          value={isAvailable}
          onChange={(value) => {
            setIsAvailable(value);
          }}
          list={[
            {
              label: 'Yes',
              value: '1',
            },
            {
              label: 'No',
              value: '2',
            },
          ]}
        />
      </div>
      <div className={css['buttons']}>
        <Button onClick={() => console.log('ff')}>Continue</Button>
      </div>
    </div>
  );
};

export default AvailableForJobs;
