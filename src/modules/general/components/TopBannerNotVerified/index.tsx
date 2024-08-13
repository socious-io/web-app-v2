import React from 'react';
import { KYBModal } from 'src/modules/credentials/KYB';
import { Icon } from 'src/modules/general/components/Icon';
import { KYCModal } from 'src/modules/refer/KYC';
import { verifyAction } from 'src/modules/refer/referUtils';

import { useTopBannerNotVerified } from './useTopBannerNotVerified';
import { TopBanner } from '../topBanner';

interface TopBannerNotVerifiedProps {
  supportingText: string;
}

export const TopBannerNotVerified: React.FC<TopBannerNotVerifiedProps> = ({ supportingText }) => {
  const { connectUrl, setConnectUrl, openVerifyModal, setOpenVerifyModal, type } = useTopBannerNotVerified();
  return (
    <>
      <TopBanner
        theme="warning"
        primaryBtnLabel="Verify now"
        primaryBtnIcon={<Icon name="arrow-right" fontSize={20} className="text-Warning-700 p-0" />}
        primaryBtnAction={
          type === 'users' ? () => verifyAction(setConnectUrl, setOpenVerifyModal) : () => setOpenVerifyModal(true)
        }
        secondaryBtnLabel="Learn more"
        secondaryBtnLink="https://socious.io/verified-credentials"
        text={type === 'users' ? 'Verify your identity' : 'Verify your organization'}
        supportingText={supportingText}
      />
      {type === 'users' ? (
        <KYCModal open={openVerifyModal} handleClose={() => setOpenVerifyModal(false)} connectUrl={connectUrl} />
      ) : (
        <KYBModal open={openVerifyModal} setOpen={setOpenVerifyModal} />
      )}
    </>
  );
};
