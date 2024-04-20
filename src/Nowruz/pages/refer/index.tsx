import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { UserMeta } from 'src/core/api';
import { Link } from 'src/Nowruz/modules/general/components/link';
import { TopBannerNotVerified } from 'src/Nowruz/modules/general/components/TopBannerNotVerified';
import { ReferCard } from 'src/Nowruz/modules/refer/referCard';
import { RootState } from 'src/store';

export const Refer = () => {
  const verified = useSelector<RootState, boolean>(
    state => (state.identity.entities.find(item => item.current)?.meta as UserMeta).identity_verified,
  );

  return (
    <>
      <div className="flex flex-col">
        {!verified && (
          <TopBannerNotVerified supportingText="In order to access referrals, you need to have a Atala PRISM DID and verify your identity." />
        )}
        <div className="pt-8 pb-12 px-4 md:px-8 w-full md:max-w-[926px] flex flex-col gap-8">
          <div className="flex flex-col gap-1 pb-5 border border-x-0 border-t-0 border-b border-solid border-Gray-light-mode-200">
            <Typography variant="h3" className="text-Gray-light-mode-900">
              ✨ Refer and earn
            </Typography>
            <Typography variant="h5" className="text-Gray-light-mode-600">
              Help us make a bigger impact, and gain a stake in our community
            </Typography>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <span className="text-base font-normal leading-6 text-Gray-light-mode-600">
                By sharing Socious with promising talent and impact organizations, you&apos;re not just expanding our
                network, you&apos;re also accelerating change.
              </span>
              <Link
                label="Learn more about our referral program."
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
