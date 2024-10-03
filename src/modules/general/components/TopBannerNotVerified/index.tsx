import React from 'react';
import { translate } from 'src/core/utils';
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
        primaryBtnLabel={translate('dashboard-verify-now')}
        primaryBtnIcon={<Icon name="arrow-right" fontSize={20} className="text-Warning-700 p-0" />}
        primaryBtnAction={
          type === 'users' ? () => verifyAction(setConnectUrl, setOpenVerifyModal) : () => setOpenVerifyModal(true)
        }
        secondaryBtnLabel={translate('dashboard-verify-learn-more')}
        secondaryBtnLink="https://socious.io/verified-credentials"
        text={type === 'users' ? translate('dashboard-verify-user-title') : translate('dashboard-verify-org-title')}
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
