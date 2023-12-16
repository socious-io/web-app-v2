import { Divider } from '@mui/material';

import { Certificates } from './certificates';
import { Experiences } from './experience/experience';
import { Skills } from './skills';
import { Summary } from './summary';
import { MainInfo } from '../mainInfo';
import { Educations } from './educations';

export const About = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full block md:hidden">
        <MainInfo />
      </div>
      <Summary />
      <Divider />
      <Skills />
      <Divider />
      <Experiences />
      <Certificates />
      <Educations />
    </div>
  );
};
