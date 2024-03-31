import { useLoaderData, useNavigate } from 'react-router-dom';
import { ImpactPoints, User } from 'src/core/api';
import { Typography } from '@mui/material';
import { Impact } from 'src/Nowruz/modules/userProfile/components/impact';
import css from './dashboard.module.scss';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Icon } from 'src/Nowruz/general/Icon';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
import { Card } from 'src/Nowruz/modules/dashboard/card';
import { getIdentityMeta } from 'src/core/utils';

export const Dashboard = () => {
  const { userProfile, impactPointHistory } = useLoaderData() as {
    userProfile: User;
    impactPointHistory: ImpactPoints;
  };

  const navigate = useNavigate();

  let hoursWorked = 0;
  let hoursVolunteered = 0;
  const { name, type, usernameVal } = getIdentityMeta(userProfile);
  const profileUrl =
    type === 'users' ? `/profile/users/${usernameVal}/view` : `/profile/organizations/${usernameVal}/view`;

  if (impactPointHistory) {
    impactPointHistory.items
      .filter((item) => item.offer !== null)
      .forEach((item) => {
        if (item.offer) {
          if ((item?.offer?.currency && ['USD', 'YEN'].includes(item?.offer?.currency)) || item.offer.currency)
            hoursWorked += item.offer.total_hours;
          else hoursVolunteered += item.offer.total_hours;
        }
      });
  }

  const renderCard = (
    title: string,
    description: string,
    bgColor: string,
    redirectUrl: string,
    buttonLabel: string,
    buttonIcon?: string,
    supportingText1?: string,
    supportingText2?: string,
  ) => {
    return (
      <div className={css.card} style={{ backgroundColor: bgColor }}>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-Gray-light-mode-900">{title}</span>
          <span className="text-sm font-normal text-Gray-light-mode-600">{description}</span>
        </div>
        <div className="flex flex-col gap-1">
          {!!supportingText1 && (
            <span className="text-sm font-semibold text-Gray-light-mode-900">{supportingText1}</span>
          )}
          {!!supportingText2 && (
            <span className="text-sm font-semibold text-Gray-light-mode-900">{supportingText2}</span>
          )}
        </div>
        <div className="mr-0 ml-auto">
          <Button variant="outlined" color="primary" onClick={() => navigate(redirectUrl)} customStyle="flex gap-2">
            {!!buttonIcon && <Icon name={buttonIcon} fontSize={20} className="text-Gray-light-mode-500" />}
            {buttonLabel}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className=" w-full flex ">
      <div className="w-full h-full flex flex-col gap-8 py-8 px-4 md:px-8">
        <div className="flex flex-col gap-1">
          <Typography variant="h3" className="text-Gray-light-mode-900">
            👋 Welcome back, {type === 'users' ? userProfile.first_name : name}
          </Typography>
          {type === 'users' && (
            <Typography variant="h5" className="text-Gray-light-mode-600">
              Your current impact and activity.
            </Typography>
          )}
        </div>
        <div className="w-full h-fit flex gap-4 overflow-x-scroll">
          {!userProfile.bio || !userProfile.experiences?.length
            ? renderCard(
                'Complete your profile',
                'Get discovered by organizations',
                variables.color_wild_blue_100,
                profileUrl,
                'Edit profile',
                '',
                'Add a summary',
                'Add your experience',
              )
            : renderCard(
                'Refer and earn',
                'Help us make an impact and earn rewards by sharing Socious with  potential talent and organizations.',
                variables.color_wild_blue_100,
                '/refer',
                'Refer now',
                'star-06',
              )}

          {renderCard(
            'Find jobs',
            'Explore opportunities aligned with your values',
            variables.color_dark_vanilla_100,
            '/jobs',
            'Find jobs',
          )}
          {renderCard(
            'Sell your services',
            'Showcase your unique offerings and attract clients',
            variables.color_appricot_100,
            '/',
            'Create service',
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-4 md:grid-rows-2 gap-4">
          <div className="row-span-2 col-span-2 md:col-span-1">
            <Impact myProfile={true} point={userProfile.impact_points} />
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
      </div>
      <div className="hidden md:flex w-[392px] h-full">
        <ProfileCard identity={userProfile} labelShown={false} rounded={false} />
      </div>
    </div>
  );
};
