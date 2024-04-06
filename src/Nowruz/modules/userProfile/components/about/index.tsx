import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import { Certificates } from './certificate/certificates';
import { Educations } from './education/educations';
import { Experiences } from './experience/experience';
import { Recommendation } from './recommendaion/recommendation';
import { Skills } from './skills';
import { Summary } from './summary';
import { MainInfo } from '../mainInfo';
import { useState } from 'react';
import { VerifyModal } from 'src/Nowruz/modules/refer/verifyModal';

export const About = () => {
  const identityType = useSelector<RootState, 'users' | 'organizations'>(state => {
    return state.profile.type;
  });
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
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
          <Experiences handleOpenVerifyModal={() => setOpenVerifyModal(true)} />
          <Educations />
          <Certificates />
          <VerifyModal open={openVerifyModal} handleClose={() => setOpenVerifyModal(false)} />
        </>
      )}

      {identityType === 'organizations' && <Recommendation />}
    </div>
  );
};
