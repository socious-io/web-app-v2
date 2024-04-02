import { useLoaderData } from 'react-router-dom';
import { User } from 'src/core/api';
import { Typography } from '@mui/material';
import { Icon } from 'src/Nowruz/general/Icon';
import { useState } from 'react';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Link } from 'src/Nowruz/modules/general/components/link';

import { ReferCard } from 'src/Nowruz/modules/refer/referCard';
import { VerifyModal } from 'src/Nowruz/modules/refer/verifyModal';

export const Refer = () => {
  const { userProfile } = useLoaderData() as { userProfile: User };
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        {!userProfile.identity_verified && (
          <div className="w-full  px-4 py-4 md:px-8 md:py-1 bg-Warning-25 border border-t-0 border-x-0 border-b border-solid border-Warning-300 flex flex-col md:flex-row gap-4 md:justify-between">
            <div className="flex gap-4 items-center">
              <div className="hidden md:flex">
                <FeaturedIconOutlined theme="warning" iconName="alert-circle" size="md" />
              </div>
              <div className="flex flex-col md:flex-row gap-[2px] md:gap-1.5">
                <span className="font-semibold text-sm text-Warning-700">Verify your identity</span>
                <span className="font-normal text-sm text-Warning-700">
                  In order to access referrals, you need to have a Atala PRISM DID and verify your identity.
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="text" color="error" customStyle="text-Warning-600">
                Learn more
              </Button>
              <Button
                variant="text"
                color="error"
                customStyle="text-Warning-700 flex gap-2 items-center"
                onClick={() => setOpenVerifyModal(true)}
              >
                Verify now
                <Icon name="arrow-right" fontSize={20} className="text-Warning-700" />
              </Button>
            </div>
          </div>
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
              <span className="text-base font-normal text-Gray-light-mode-600">
                By sharing Socious with promising talent and impact organizations, you're not just expanding our
                network, you're also accelerating change.
              </span>
              <Link label="Learn more about our referral program." href="/refer" customStyle="!text-base" />
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
