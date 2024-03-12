import { useLoaderData } from 'react-router-dom';
import { ImpactPoints, User } from 'src/core/api';
import { Divider, Typography } from '@mui/material';
import css from './refer.module.scss';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { useState } from 'react';
import { config } from 'src/config';

export const Refer = () => {
  const { userProfile, impactPointHistory } = useLoaderData() as { userProfile: User; impactPointHistory: ImpactPoints };
  const [openAddCardModal, setOpenAddCardModal] = useState(false);


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
    <div className="flex flex-col">
      {!userProfile.identity_verified && (
        <AlertMessage
          theme="warning"
          iconName="alert-circle"
          title="Verify your identity"
          subtitle="In order to access referrals, you need to have a Atala PRISM DID and verify your identity."
        >
          <div className="flex">
            <button
              className="cursor-pointer border-none text-sm leading-5 font-semibold text-Warning-600"
            >
              Learn more
            </button>
            <button
              className="cursor-pointer border-none flex"
            >
              <div className="text-sm leading-5 font-semibold text-Error-700 pl-3 pr-2">Verify now</div>
              <Icon name="arrow-right" fontSize={20} color={variables.color_error_700} />
            </button>
          </div>
        </AlertMessage>
      )}

      <div className={css.referContainer}>
        <Typography variant="h3" className="text-Gray-light-mode-900">
          ✨ Refer and earn
        </Typography>
        <Typography variant="h5" className="text-Gray-light-mode-600 pt-1 pb-5">
          Help us make a bigger impact, and gain a stake in our community
        </Typography>

        <Divider />

        <div className="pt-8 pb-6">
          <Typography variant="h5" className={css.learnMoreText}>
            By sharing Socious with promising talent and impact organizations, you're not just expanding our network,
            you're also accelerating change.
          </Typography>
          <div className={css.learnMoreText}>
            Learn more about our referral program.
          </div>
        </div>

        <div className="grid grid-flow-col auto-cols-max gap-x-8 gap-y-6">
          <div className="rounded-lg sm:row-span-2">
            <div className={`${css.colorCardContainer} ${css.bgWildBlue}`}>
              <div className={css.colorCardDiv}>
                <div className={css.colorCardTitle}>Refer organizations</div>
              </div>
              <div className={css.colorCardDescription}>
                Send your link to organizations looking for purpose-driven talent.
              </div>
              {userProfile.identity_verified && (
                <div>
                  {config.appBaseURL}referral/{userProfile.username}/org
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg sm:row-span-2">
            <div className={`${css.colorCardContainer} ${css.bgDarkVanilla}`}>
              <div className={css.colorCardDiv}>
                <div className={css.colorCardTitle}>Refer talent</div>
              </div>
              <div className={css.colorCardDescription}>
                Send your link to talent looking for jobs and making a difference.
              </div>
              {userProfile.identity_verified && (
                <div>
                  {config.appBaseURL}referral/{userProfile.username}/talent
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
