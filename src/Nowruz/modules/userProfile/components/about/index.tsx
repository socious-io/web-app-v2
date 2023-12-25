import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import { Certificates } from './certificate/certificates';
import { Educations } from './education/educations';
import { Experiences } from './experience/experience';
import { Skills } from './skills';
import { Summary } from './summary';
import { MainInfo } from '../mainInfo';

export const About = () => {
  const identityType = useSelector<RootState, 'users' | 'organizations'>((state) => {
    return state.profile.type;
  });
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full block md:hidden">
        <MainInfo />
      </div>
      <Summary />
      <Divider />
      {identityType === 'users' && (
        <>
          <Skills />
          <Divider />
          <Experiences />
          <Educations />
          <Certificates />
        </>
      )}
    </div>
  );
};
