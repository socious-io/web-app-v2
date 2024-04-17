import React from 'react';
import variables from 'src/components/_exports.module.scss';

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
        title="Find professionals"
        description="Discover purpose-driven individuals aligned with your values"
        bgColor={variables.color_dark_vanilla_100}
        redirectUrl="/"
        buttonLabel="Explore"
      />

      <DashboardCard
        title="Create job"
        description="Post job to connect with skilled professionals"
        bgColor={variables.color_appricot_100}
        redirectUrl="/jobs/create"
        buttonLabel="Create job"
      />
    </div>
  );
};
