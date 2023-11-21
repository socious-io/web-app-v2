import { Divider } from '@mui/material';
import React from 'react';

import { AboutProps } from './about.types';
import { Experiences } from './experience';
import { Skills } from './skills';
import { Summary } from './summary';

export const About: React.FC<AboutProps> = (props) => {
  const { summary, experiences, skills } = props;
  return (
    <div className="flex flex-col gap-8">
      <Summary description={summary} />
      <Divider />
      <Skills skills={skills} />
      <Divider />
      <Experiences items={experiences} />
    </div>
  );
};
