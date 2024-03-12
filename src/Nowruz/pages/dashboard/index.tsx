import { useLoaderData, useNavigate } from 'react-router-dom';
import { ImpactPoints, User } from 'src/core/api';
import { Divider, Typography } from '@mui/material';
import { Impact } from 'src/Nowruz/modules/userProfile/components/impact';
import { HoursSpentCard } from 'src/Nowruz/modules/userProfile/components/impact/hoursSpentCard';
import css from './dashboard.module.scss';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Icon } from 'src/Nowruz/general/Icon';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';

export const Dashboard = () => {
  const { userProfile, impactPointHistory } = useLoaderData() as { userProfile: User; impactPointHistory: ImpactPoints };
  const navigate = useNavigate();

  let hoursWorked = 0;
  let hoursVolunteered = 0;
  if (impactPointHistory) {
    impactPointHistory.items
      .filter((item) => item.offer !== null)
      .forEach((item) => {
        if (item.offer) {
          if ((item?.offer?.currency && ['USD', 'YEN'].includes(item?.offer?.currency)) || item.offer.currency)
            hoursWorked += item.offer.total_hours;
          else
            hoursVolunteered += item.offer.total_hours;
        }
      });
  }

  return (
    <div className="flex h-full">
      <div className={css.dashboardContainer}>
        <Typography variant="h3" className="text-Gray-light-mode-900">
          👋 Welcome back, {userProfile.first_name}
        </Typography>
        <Typography variant="h5" className="text-Gray-light-mode-600 pt-1">
          Your current impact and activity.
        </Typography>

        <div className="flex gap-4">
          <div className="hidden lg:block rounded-lg sm:row-span-2">
            <div className={`${css.colorCardContainer} ${css.bgWildBlue}`}>
              <div className={css.colorCardDiv}>
                <div className={css.colorCardTitle}>Refer and earn</div>
              </div>
              <div className={css.colorCardDescription}>
                Help us make an impact and earn rewards by sharing Socious with  potential talent and organizations.
              </div>
              <div className="self-end">
                <Button
                  variant="outlined"
                  color="secondary"
                  className={css.button}
                  onClick={() => {navigate('/refer');}}
                >
                  <Icon name="star-06" fontSize={20} color={variables.color_grey_700} />
                  Refer now
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block rounded-lg sm:row-span-2">
            <div className={`${css.colorCardContainer} ${css.bgDarkVanilla}`}>
              <div className={css.colorCardDiv}>
                <div className={css.colorCardTitle}>Find jobs</div>
              </div>
              <div className={css.colorCardDescription}>
                Explore opportunities aligned with your values
              </div>
              <div className="self-end">
                <Button
                  variant="outlined"
                  color="secondary"
                  className={css.button}
                  onClick={() => {navigate('/jobs');}}
                >
                  Find jobs
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block rounded-lg sm:row-span-2">
            <div className={`${css.colorCardContainer} ${css.bgApricot}`}>
              <div className={css.colorCardDiv}>
                <div className={css.colorCardTitle}>Sell your services</div>
              </div>
              <div className={css.colorCardDescription}>
                Showcase your unique offerings and attract clients
              </div>
              <div className="self-end">
                <Button variant="outlined" color="secondary" className={css.button}>
                  Create service
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="row-span-2"><Impact myProfile={true} point={userProfile.impact_points} /></div>
          <div className={css.impactCardContainer}>
            <HoursSpentCard cardText={"Total hours contributed"} hours={hoursWorked + hoursVolunteered} />
          </div>
          <div className={css.impactCardContainer}>
            <HoursSpentCard cardText={"Hours worked"} hours={hoursWorked} />
          </div>
          <div className={css.impactCardContainer}>
            <HoursSpentCard cardText={"Hours volunteered"} hours={hoursVolunteered} />
          </div>
        </div>
        
      </div>
      <Divider orientation="vertical" sx={{ bgcolor: variables.color_grey_200 }} flexItem />
      <div className="flex-none w-25">
        <ProfileCard identity={userProfile} />
      </div>
    </div>
  );
};
