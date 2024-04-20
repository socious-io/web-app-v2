import { Divider } from '@mui/material';
import { VerifyModal } from 'src/Nowruz/modules/refer/verifyModal';

import { Certificates } from './certificate/certificates';
import { Educations } from './education/educations';
import { Experiences } from './experience/experience';
import { Recommendation } from './recommendaion/recommendation';
import { Skills } from './skills';
import { Summary } from './summary';
import { useAbout } from './useAbout';
import { MainInfo } from '../mainInfo';

export const About = () => {
  const { connectUrl, handleOpenVerifyModal, identityType, openVerifyModal, setOpenVerifyModal } = useAbout();

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
          <Experiences handleOpenVerifyModal={handleOpenVerifyModal} />
          <Educations handleOpenVerifyModal={() => setOpenVerifyModal(true)} />
          <Certificates />
          <VerifyModal open={openVerifyModal} handleClose={() => setOpenVerifyModal(false)} connectUrl={connectUrl} />
        </>
      )}

      {identityType === 'organizations' && <Recommendation />}
    </div>
  );
};
