import { Typography } from '@mui/material';
import { Organization, User } from 'src/core/api';
import { Card } from 'src/Nowruz/modules/dashboard/card';
import { OrgCards } from 'src/Nowruz/modules/dashboard/orgCards';
import { UserCards } from 'src/Nowruz/modules/dashboard/userCards';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
import { TopBanner } from 'src/Nowruz/modules/general/components/topBanner';
import { TopBannerNotVerified } from 'src/Nowruz/modules/general/components/TopBannerNotVerified';
import { Impact } from 'src/Nowruz/modules/userProfile/components/impact';

import { useDashboard } from './useDashborad';

export const Dashboard = () => {
  const { verified, type, profileData, profileUrl, hoursVolunteered, hoursWorked, name, verificationStatus } =
    useDashboard();

  return (
    <>
      <div className=" w-full flex ">
        <div className="w-full h-full flex flex-col">
          {!verified ? (
            verificationStatus === 'PENDING' && type === 'organizations' ? (
              <TopBanner
                theme="warning"
                text="Verification pending"
                supportingText="We reviewing your submitted documents, we will notify you once it is complete."
              />
            ) : (
              <TopBannerNotVerified
                supportingText={
                  type === 'users'
                    ? 'In order to claim your certificates, please verify your identity.'
                    : 'Get your organization verified to issue credentials.'
                }
              />
            )
          ) : (
            ''
          )}

          {verified && !hideVerifyBanner && (
            <TopBanner
              theme="success"
              text="Your identity has been verified"
              supportingText="You can now claim your certificates."
              secondaryBtnLabel="Dismiss"
              secondaryBtnAction={handleDismissVerified}
            />
          )}

          <div className=" flex flex-col gap-8 py-8 px-4 md:px-8">
            <div className="flex flex-col gap-1">
              <Typography variant="h3" className="text-Gray-light-mode-900">
                👋 Welcome back, {type === 'users' ? (profileData as User).first_name : name}
              </Typography>
              {type === 'users' && (
                <Typography variant="h5" className="text-Gray-light-mode-600">
                  Your current impact and activity.
                </Typography>
              )}
            </div>
            {type === 'users' ? (
              <UserCards
                profileCompleted={!!profileData.bio && !!(profileData as User).experiences?.length}
                profileUrl={profileUrl}
              />
            ) : (
              <OrgCards profileCompleted={!!(profileData as Organization).culture} profileUrl={profileUrl} />
            )}
            {type === 'users' && (
              <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-4 md:grid-rows-2 gap-4">
                <div className="row-span-2 col-span-2 md:col-span-1">
                  <Impact myProfile={true} point={profileData.impact_points} />
                </div>
                <div className="row-span-1 col-span-1">
                  <Card
                    iconName="clock"
                    cardText={'Total hours contributed'}
                    number={hoursWorked + hoursVolunteered}
                    unit="hrs"
                  />
                </div>
                <div className="row-span-1 col-span-1">
                  <Card iconName="clock" cardText={'Hours worked'} number={hoursWorked} unit="hrs" />
                </div>
                <div className="row-span-1 col-span-1">
                  <Card iconName="clock" cardText={'Hours volunteered'} number={hoursVolunteered} unit="hrs" />
                </div>
                {/* <div className="row-span-1 col-span-1">
            <Card iconName="currency-dollar" cardText={'Donated'} number={`$${donated}`} />
          </div> */}
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:flex w-[392px] h-full">
          <ProfileCard identity={profileData} labelShown={false} rounded={false} />
        </div>
      </div>
    </>
  );
};
