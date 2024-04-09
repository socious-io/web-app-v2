import { CurrentIdentity, UserMeta } from 'src/core/api';
import { Typography } from '@mui/material';
import { Icon } from 'src/Nowruz/general/Icon';
import { useState } from 'react';
import { Link } from 'src/Nowruz/modules/general/components/link';
import { ReferCard } from 'src/Nowruz/modules/refer/referCard';
import { VerifyModal } from 'src/Nowruz/modules/refer/verifyModal';
import { TopBanner } from 'src/Nowruz/modules/general/components/topBanner';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export const Refer = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );

  const verified = (currentIdentity?.meta as UserMeta).identity_verified;

  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        {!verified && (
          <TopBanner
            theme="warning"
            text="Verify your identity"
            supportingText="In order to access referrals, you need to have a Atala PRISM DID and verify your identity."
            primaryBtnLabel="Verify now"
            primaryBtnIcon={<Icon name="arrow-right" fontSize={20} className="text-Warning-700" />}
            primaryBtnAction={() => setOpenVerifyModal(true)}
            secondaryBtnLabel="Learn more"
            secondaryBtnLink="https://socious.io/decentralized-referrals"
          />
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
                By sharing Socious with promising talent and impact organizations, you're not just expanding our
                network, you're also accelerating change.
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
      <VerifyModal open={openVerifyModal} handleClose={() => setOpenVerifyModal(false)} />
    </>
  );
};
