import React from 'react';
import { useTranslation } from 'react-i18next';
import variables from 'src/styles/constants/_exports.module.scss';

import { DashboardCard } from '../dashboardCard';

interface OrgCardsProps {
  profileCompleted: boolean;
  profileUrl: string;
}
export const OrgCards: React.FC<OrgCardsProps> = () => {
  const { t } = useTranslation('dashboard');
  return (
    <div className="w-full h-fit flex gap-4 overflow-x-scroll">
      {/* {!profileCompleted && (
        <DashboardCard
          title="Complete your profile"
          description=""
          bgColor={variables.color_wild_blue_100}
          redirectUrl={profileUrl}
          buttonLabel="Edit profile"
          supportingText1="Add your organization culture"
          supportingText2="Add social media"
        />
      )} */}
      <DashboardCard
        title="Find professionals"
        description={t('profile.discover_purpose_driven')}
        bgColor={variables.color_dark_vanilla_100}
        redirectUrl="/"
        buttonLabel={t('profile.explore')}
      />

      <DashboardCard
        title={t('profile.create_job')}
        description="Post job to connect with skilled professionals"
        bgColor={variables.color_appricot_100}
        redirectUrl="/jobs/create"
        buttonLabel={t('profile.create_job')}
      />
    </div>
  );
};
