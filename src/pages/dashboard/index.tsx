import { Typography } from '@mui/material';
import { Organization, User } from 'src/core/api';
import { translate } from 'src/core/utils';
import { Card } from 'src/modules/dashboard/card';
import { OrgCards } from 'src/modules/dashboard/orgCards';
import { UserCards } from 'src/modules/dashboard/userCards';
import ProfileCard from 'src/modules/general/components/profileCard';
import { TopBanner } from 'src/modules/general/components/topBanner';
import { TopBannerNotVerified } from 'src/modules/general/components/TopBannerNotVerified';
import { Impact } from 'src/modules/userProfile/components/impact';

import { useDashboard } from './useDashborad';

export const Dashboard = () => {
  const {
    verified,
    type,
    profileData,
    profileUrl,
    hoursVolunteered,
    hoursWorked,
    name,
    verificationStatus,
    event,
    navigateToSearchEvent,
  } = useDashboard();

  return (
    <>
      <div className=" w-full h-full flex ">
        <div className="w-full h-full flex flex-col">
          {!verified ? (
            verificationStatus === 'PENDING' && type === 'organizations' ? (
              <TopBanner
                theme="warning"
                text={translate('dashboard-verification-pending')}
                supportingText={translate('dashboard-verification-pending-subtitle')}
              />
            ) : (
              <TopBannerNotVerified
                supportingText={
                  type === 'users'
                    ? translate('dashboard-user-not-verified-title')
                    : translate('dashboard-org-not-verified-title')
                }
              />
            )
          ) : (
            ''
          )}
          {!!event && (
            <TopBanner
              theme="purple"
              text={translate('dashboard-tech-banner-title')}
              supportingText={translate('dashboard-tech-banner-subtitle')}
              primaryBtnLabel={translate('dashboard-tech-banner-btn-label')}
              primaryButtonStyle="!bg-Purple-600 text-Base-White px-4 !h-10 w-full"
              primaryBtnAction={navigateToSearchEvent}
              customStyle="xl:py-3"
            />
          )}

          <div className=" flex flex-col gap-8 py-8 px-4 md:px-8 ">
            <div className="flex flex-col gap-1">
              <Typography variant="h3" className="text-Gray-light-mode-900">
                {translate('dashboard-welcome', { name: type === 'users' ? (profileData as User).first_name : name })}
              </Typography>
              {type === 'users' && (
                <Typography variant="h5" className="text-Gray-light-mode-600">
                  {translate('dashboard-header-subtitle')}
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
                <div className="row-span-1 md:row-span-2 col-span-2 md:col-span-1">
                  <Impact myProfile={true} point={profileData.impact_points} />
                </div>
                <div className="row-span-1 col-span-1">
                  <Card
                    iconName="clock"
                    cardText={translate('dashboard-total-hours')}
                    number={hoursWorked + hoursVolunteered}
                    unit="hrs"
                  />
                </div>
                <div className="row-span-1 col-span-1">
                  <Card
                    iconName="clock"
                    cardText={translate('dashboard-hours-worked')}
                    number={hoursWorked}
                    unit="hrs"
                  />
                </div>
                <div className="row-span-1 col-span-1">
                  <Card
                    iconName="clock"
                    cardText={translate('dashboard-hours-volunteer')}
                    number={hoursVolunteered}
                    unit="hrs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:flex w-[392px] min-w-[392px] h-full">
          <ProfileCard identity={profileData} labelShown={false} rounded={false} />
        </div>
      </div>
    </>
  );
};
