import { Divider } from '@mui/material';
import { KYCModal } from 'src/modules/refer/KYC';

import { Certificates } from './certificate/certificates';
import Culture from './Culture';
import { Educations } from './education/educations';
import { Experiences } from './experience/experience';
import { Skills } from './skills';
import { Summary } from './summary';
import { useAbout } from './useAbout';
import { MainInfo } from '../mainInfo';
import { AboutProps } from './index.types';

export const About: React.FC<AboutProps> = ({ onOpenPreferences }) => {
  const { connectUrl, culturePreferences, handleOpenVerifyModal, identityType, openVerifyModal, setOpenVerifyModal } =
    useAbout();

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full block md:hidden">
        <MainInfo />
      </div>
      <Summary />
      <Divider />
      {identityType === 'organizations' && (
        <>
          {!!culturePreferences.length && onOpenPreferences && (
            <Culture items={culturePreferences} onOpenPreferences={onOpenPreferences} />
          )}
          <Divider />
        </>
      )}
      {identityType === 'users' && (
        <>
          <Skills />
          <Divider />
          <Experiences handleOpenVerifyModal={handleOpenVerifyModal} />
          <Educations handleOpenVerifyModal={handleOpenVerifyModal} />
          <Certificates />
          <KYCModal open={openVerifyModal} handleClose={() => setOpenVerifyModal(false)} connectUrl={connectUrl} />
        </>
      )}

      {/* {identityType === 'organizations' && <Recommendation />} */}
    </div>
  );
};
