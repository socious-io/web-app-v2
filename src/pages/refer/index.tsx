import { Typography } from '@mui/material';
import { translate } from 'src/core/utils';
import { Link } from 'src/modules/general/components/link';
import { TopBanner } from 'src/modules/general/components/topBanner';
import { TopBannerNotVerified } from 'src/modules/general/components/TopBannerNotVerified';
import { ReferCard } from 'src/modules/refer/referCard';

import { useRefer } from './useRefer';

export const Refer = () => {
  const {
    data: { type, verified, verificationStatus, hideVerifyBanner },
    operations: { handleDismissVerified },
  } = useRefer();

  return (
    <>
      <div className="flex flex-col">
        {!verified ? (
          verificationStatus === 'PENDING' && type === 'organizations' ? (
            <TopBanner
              theme="warning"
              text={translate('refer-pending-org-banner')}
              supportingText={translate('refer-pending-org-banner-desc')}
            />
          ) : (
            <TopBannerNotVerified
              supportingText={
                type === 'users'
                  ? translate('refer-not-verified-user-banner-desc')
                  : translate('refer-not-verified-org-banner-desc')
              }
            />
          )
        ) : (
          !hideVerifyBanner && (
            <TopBanner
              theme="success"
              text={translate('refer-verified-banner', {
                identity: type === 'users' ? 'identity' : "organization's identity",
              })}
              supportingText={
                type === 'users'
                  ? translate('refer-verified-user-banner-desc')
                  : translate('refer-verified-org-banner-desc')
              }
              secondaryBtnLabel={translate('refer-verified-dismiss-btn')}
              secondaryBtnAction={handleDismissVerified}
            />
          )
        )}
        <div className="pt-8 pb-12 px-4 md:px-8 w-full md:max-w-[926px] flex flex-col gap-8">
          <div className="flex flex-col gap-1 pb-5 border border-x-0 border-t-0 border-b border-solid border-Gray-light-mode-200">
            <Typography variant="h3" className="text-Gray-light-mode-900">
              {translate('refer-header')}
            </Typography>
            <Typography variant="h5" className="text-Gray-light-mode-600">
              {translate('refer-title')}
            </Typography>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <span className="text-base font-normal leading-6 text-Gray-light-mode-600">
                {translate('refer-subtitle')}
              </span>
              <Link
                label={translate('refer-lear-more')}
                href="https://socious.io/decentralized-referrals"
                target="_blank"
                customStyle="!text-base !leading-6"
              />
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:gap-8">
              <ReferCard type="organization" />
              <ReferCard type="talent" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
