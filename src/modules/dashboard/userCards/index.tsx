import React from 'react';
import { useTranslation } from 'react-i18next';
import variables from 'src/styles/constants/_exports.module.scss';

import { DashboardCard } from '../dashboardCard';

interface UserCardsProps {
  profileCompleted: boolean;
  profileUrl: string;
}
export const UserCards: React.FC<UserCardsProps> = ({ profileCompleted, profileUrl }) => {
  const { t } = useTranslation('dashboard');

  return (
    <div className="w-full h-fit flex gap-4 overflow-x-scroll">
      {!profileCompleted ? (
        <DashboardCard
          title={t('profile.complete_your_profile')}
          description={t('talent_dashboard.get_discovered')}
          bgColor={variables.color_wild_blue_100}
          redirectUrl={profileUrl}
          buttonLabel={t('profile.edit')}
          supportingText1={t('talent_dashboard.add_summary')}
          supportingText2={t('talent_dashboard.add_experience')}
        />
      ) : (
        <DashboardCard
          title={t('talent_dashboard.refer_earn')}
          description={t('talent_dashboard.refer_earn_description')}
          bgColor={variables.color_wild_blue_100}
          redirectUrl="/referral"
          buttonLabel={t('talent_dashboard.refer_now')}
          buttonIcon="star-06"
        />
      )}
      <DashboardCard
        title={t('talent_dashboard.find_jobs')}
        description={t('talent_dashboard.explore_opportunities')}
        bgColor={variables.color_dark_vanilla_100}
        redirectUrl="/jobs"
        buttonLabel={t('talent_dashboard.find_jobs')}
      />

      {/* <DashboardCard
        title="Sell your services"
        description="Showcase your unique offerings and attract clients"
        bgColor={variables.color_appricot_100}
        redirectUrl="/"
        buttonLabel="Create service"
      /> */}
    </div>
  );
};
