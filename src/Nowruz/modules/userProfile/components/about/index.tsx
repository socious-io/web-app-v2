import { Divider } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { requestVerification } from 'src/core/api';
import { VerifyModal } from 'src/Nowruz/modules/refer/verifyModal';
import { RootState } from 'src/store';

import { Certificates } from './certificate/certificates';
import { Educations } from './education/educations';
import { Experiences } from './experience/experience';
import { Recommendation } from './recommendaion/recommendation';
import { Skills } from './skills';
import { Summary } from './summary';
import { MainInfo } from '../mainInfo';

export const About = () => {
  const identityType = useSelector<RootState, 'users' | 'organizations'>(state => {
    return state.profile.type;
  });
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [connectUrl, setConnectUrl] = useState<string>('');
  const verifyAction = async () => {
    const vc = await requestVerification();
    setConnectUrl(vc.connection_url);
    setOpenVerifyModal(true);
  };

  const handleOpenVerifyModal = async () => {
    await verifyAction();
    setOpenVerifyModal(true);
  };
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
