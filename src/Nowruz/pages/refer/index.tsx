import { useLoaderData } from 'react-router-dom';
import { User } from 'src/core/api';
import { Typography } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { useState } from 'react';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Link } from 'src/Nowruz/modules/general/components/link';

export const Refer = () => {
  const { userProfile } = useLoaderData() as { userProfile: User };
  const [openAddCardModal, setOpenAddCardModal] = useState(false);

  const renderCard = (type: 'organization' | 'talent') => {
    const title = type === 'organization' ? 'Refer organizations' : 'Refer talent';
    const subtitle =
      type === 'organization'
        ? 'Send your link to organizations looking for purpose-driven talent.'
        : 'Send your link to talent looking for jobs and making a difference.';
    return (
      <div
        className="flex-1 flex flex-col gap-6 rounded-xl"
        style={{
          backgroundColor: type === 'organization' ? variables.color_wild_blue_100 : variables.color_dark_vanilla_100,
        }}
      >
        <div className="flex flex-col gap-1 px-6 pt-5">
          <span className="font-semibold text-lg text-Gray-light-mode-900">{title}</span>
          <span className="font-normal text-sm text-Gray-light-mode-600">{subtitle}</span>
        </div>
        <div
          className={`p-6 flex flex-col gap-3 border border-b-0 border-x-0 border-t border-solid ${
            type === 'organization' ? 'border-Wild_blue-500' : 'border-Dark_vanilla-500'
          } `}
        >
          <span className="text-lg font-semibold text-Gray-light-mode-900">You get</span>
          <div className="flex gap-3">
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor:
                  type === 'organization' ? variables.color_wild_blue_500 : variables.color_dark_vanilla_500,
              }}
            >
              <img src="/icons/nowruz/check.svg" alt="" />
            </div>
            <span className="text-sm font-normal text-Gray-light-mode-600">
              {type === 'organization'
                ? '1% of every invoice when your referral hires'
                : '1% of their earnings on Socious'}
            </span>
          </div>
          <span className="text-lg font-semibold text-Gray-light-mode-900">They get</span>
          <div className="flex gap-3">
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor:
                  type === 'organization' ? variables.color_wild_blue_500 : variables.color_dark_vanilla_500,
              }}
            >
              <img src="/icons/nowruz/check.svg" alt="" />
            </div>
            <span className="text-sm font-normal text-Gray-light-mode-600">
              50% discount on Socious fees for the first month
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
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
            <Button variant="text" color="error" customStyle="text-Warning-700 flex gap-2 items-center">
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
              By sharing Socious with promising talent and impact organizations, you're not just expanding our network,
              you're also accelerating change.
            </span>
            <Link label="Learn more about our referral program." href="/refer" customStyle="!text-base" />
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div>{renderCard('organization')}</div>
            <div>{renderCard('talent')}</div>
          </div>
        </div>
      </div>

      {/* {userProfile.identity_verified && (
                <div>
                  {config.appBaseURL}referral/{userProfile.username}/org
                </div>
              )}

{userProfile.identity_verified && (
                <div>
                  {config.appBaseURL}referral/{userProfile.username}/talent
                </div>
              )} */}
    </div>
  );
};
