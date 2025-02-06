import React from 'react';
import { useTranslation } from 'react-i18next';
import { translate } from 'src/core/utils';
import variables from 'src/styles/constants/_exports.module.scss';

import { DashboardCard } from '../dashboardCard';

interface UserCardsProps {
  profileCompleted: boolean;
  profileUrl: string;
}
export const UserCards: React.FC<UserCardsProps> = ({ profileCompleted, profileUrl }) => {
  return (
    <div className="w-full h-fit flex gap-4 overflow-x-scroll">
      {!profileCompleted ? (
        <DashboardCard
          title={translate('dashboard-complete-profile')}
          description={translate('dashboard-get-discovered')}
          bgColor={variables.color_wild_blue_100}
          redirectUrl={profileUrl}
          buttonLabel={translate('dashboard-edit-profile')}
          supportingText1={translate('dashboard-add-summary')}
          supportingText2={translate('dashboard-add-experience')}
        />
      ) : (
        <DashboardCard
          title={translate('dashboard-refer-earn')}
          description={translate('dashboard-refer-earn-desc')}
          bgColor={variables.color_wild_blue_100}
          redirectUrl="/referral"
          buttonLabel={translate('dashboard-refer-btn')}
          buttonIcon="star-06"
        />
      )}
      <DashboardCard
        title={translate('dashboard-create-service-title')}
        description={translate('dashboard-create-service-description')}
        bgColor={variables.color_dark_vanilla_100}
        redirectUrl="/services/create"
        buttonLabel={translate('dashboard-create-service-button-label')}
      />
      <DashboardCard
        title={translate('dashboard-find-job')}
        description={translate('dashboard-find-job-desc')}
        bgColor={variables.color_dark_vanilla_100}
        redirectUrl="/jobs"
        buttonLabel={translate('dashboard-find-job')}
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
