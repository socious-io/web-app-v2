import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { UserMeta } from 'src/core/api';
import { translate } from 'src/core/utils';
import { Link } from 'src/modules/general/components/link';
import { TopBannerNotVerified } from 'src/modules/general/components/TopBannerNotVerified';
import { ReferCard } from 'src/modules/refer/referCard';
import { RootState } from 'src/store';

export const Refer = () => {
  const verified = useSelector<RootState, boolean | undefined>(
    state => (state.identity.entities.find(item => item.current)?.meta as UserMeta).identity_verified,
  );

  return (
    <>
      <div className="flex flex-col">
        {!verified && <TopBannerNotVerified supportingText={translate('referral-banner')} />}
        <div className="pt-8 pb-12 px-4 md:px-8 w-full md:max-w-[926px] flex flex-col gap-8">
          <div className="flex flex-col gap-1 pb-5 border border-x-0 border-t-0 border-b border-solid border-Gray-light-mode-200">
            <Typography variant="h3" className="text-Gray-light-mode-900">
              {translate('referral-header')}
            </Typography>
            <Typography variant="h5" className="text-Gray-light-mode-600">
              {translate('referral-title')}
            </Typography>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <span className="text-base font-normal leading-6 text-Gray-light-mode-600">
                {translate('referral-subtitle')}
              </span>
              <Link
                label={translate('referral-lear-more')}
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
