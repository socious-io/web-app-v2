import { Divider } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showSpinner } from 'src/store/reducers/spinner.reducer';

import { Certificates } from './certificate/certificates';
import { Educations } from './education/educations';
import { Experiences } from './experience/experience';
import { Skills } from './skills';
import { Summary } from './summary';
import { MainInfo } from '../mainInfo';

export const About = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showSpinner());
  }, []);

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
      <Educations />
      <Certificates />
    </div>
  );
};
