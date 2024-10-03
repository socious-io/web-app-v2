import React from 'react';
import { useTranslation } from 'react-i18next';
import { translate } from 'src/core/utils';
import variables from 'src/styles/constants/_exports.module.scss';

import { DashboardCard } from '../dashboardCard';

interface OrgCardsProps {
  profileCompleted: boolean;
  profileUrl: string;
}
export const OrgCards: React.FC<OrgCardsProps> = () => {
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
        title={translate('dashboard-find-professional')}
        description={translate('dashboard-find-professional-desc')}
        bgColor={variables.color_dark_vanilla_100}
        redirectUrl="/"
        buttonLabel="Explore"
      />

      <DashboardCard
        title={translate('dashboard-create-job')}
        description={translate('dashboard-create-job-desc')}
        bgColor={variables.color_appricot_100}
        redirectUrl="/jobs/create"
        buttonLabel={translate('dashboard-create-job')}
      />
    </div>
  );
};
