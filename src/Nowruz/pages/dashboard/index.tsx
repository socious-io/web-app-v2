import { Typography } from '@mui/material';
import { Organization, User } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { KYBModal } from 'src/Nowruz/modules/credentials/KYB';
import { Card } from 'src/Nowruz/modules/dashboard/card';
import { OrgCards } from 'src/Nowruz/modules/dashboard/orgCards';
import { UserCards } from 'src/Nowruz/modules/dashboard/userCards';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
import { TopBanner } from 'src/Nowruz/modules/general/components/topBanner';
import { VerifyModal } from 'src/Nowruz/modules/refer/verifyModal';
import { Impact } from 'src/Nowruz/modules/userProfile/components/impact';

import { useDashboard } from './useDashborad';

export const Dashboard = () => {
  const {
    verified,
    type,
    verifyAction,
    profileData,
    profileUrl,
    hoursVolunteered,
    hoursWorked,
    openVerifyModal,
    setOpenVerifyModal,
    connectUrl,
    name,
  } = useDashboard();

  return (
    <>
      <div className=" w-full flex ">
        <div className="w-full h-full flex flex-col">
          {!verified && (
            <TopBanner
              text={type === 'users' ? 'Verify your identity' : 'Verify your organization'}
              supportingText={
                type === 'users'
                  ? 'In order to access referrals, you need to have a Atala PRISM DID and verify your identity.'
                  : 'Get a 50% discount on Socious fee for 1 month.'
              }
              theme="warning"
              primaryBtnLabel="Verify now"
              primaryBtnIcon={<Icon name="arrow-right" fontSize={20} className="text-Warning-700" />}
              primaryBtnAction={verifyAction}
              secondaryBtnLabel="Learn more"
              secondaryBtnLink="https://socious.io/verified-credentials"
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

      {type === 'users' ? (
        <VerifyModal open={openVerifyModal} handleClose={() => setOpenVerifyModal(false)} connectUrl={connectUrl} />
      ) : (
        <KYBModal open={openVerifyModal} setOpen={setOpenVerifyModal} />
      )}
    </>
  );
};
