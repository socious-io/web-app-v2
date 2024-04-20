import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { KYBModal } from 'src/Nowruz/modules/credentials/KYB';
import { VerifyModal } from 'src/Nowruz/modules/refer/verifyModal';

import { useTopBannerNotVerified } from './useTopBannerNotVerified';
import { TopBanner } from '../topBanner';

interface TopBannerNotVerifiedProps {
  supportingText: string;
}

export const TopBannerNotVerified: React.FC<TopBannerNotVerifiedProps> = ({ supportingText }) => {
  const { connectUrl, openVerifyModal, setOpenVerifyModal, verifyAction, type } = useTopBannerNotVerified();
  return (
    <>
      <TopBanner
        theme="warning"
        primaryBtnLabel="Verify now"
        primaryBtnIcon={<Icon name="arrow-right" fontSize={20} className="text-Warning-700 p-0" />}
        primaryBtnAction={verifyAction}
        secondaryBtnLabel="Learn more"
        secondaryBtnLink="https://socious.io/verified-credentials"
        text={type === 'users' ? 'Verify your identity' : 'Verify your organization'}
        supportingText={supportingText}
      />
      {type === 'users' ? (
        <VerifyModal open={openVerifyModal} handleClose={() => setOpenVerifyModal(false)} connectUrl={connectUrl} />
      ) : (
        <KYBModal open={openVerifyModal} setOpen={setOpenVerifyModal} />
      )}
    </>
  );
};
