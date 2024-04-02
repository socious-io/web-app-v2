import React from 'react';
import { DashboardCard } from '../dashboardCard';
import variables from 'src/components/_exports.module.scss';

interface UserCardsProps {
  profileCompleted: boolean;
  profileUrl: string;
}
export const UserCards: React.FC<UserCardsProps> = ({ profileCompleted, profileUrl }) => {
  return (
    <div className="w-full h-fit flex gap-4 overflow-x-scroll">
      {!profileCompleted ? (
        <DashboardCard
          title="Complete your profile"
          description="Get discovered by organizations"
          bgColor={variables.color_wild_blue_100}
          redirectUrl={profileUrl}
          buttonLabel="Edit profile"
          supportingText1="Add a summary"
          supportingText2="Add your experience"
        />
      ) : (
        <DashboardCard
          title="Refer and earn"
          description="Help us make an impact and earn rewards by sharing Socious with  potential talent and organizations."
          bgColor={variables.color_wild_blue_100}
          redirectUrl="/refer"
          buttonLabel="Refer now"
          buttonIcon="star-06"
        />
      )}
      <DashboardCard
        title="Find jobs"
        description="Explore opportunities aligned with your values"
        bgColor={variables.color_dark_vanilla_100}
        redirectUrl="/jobs"
        buttonLabel="Find jobs"
      />

      <DashboardCard
        title="Sell your services"
        description="Showcase your unique offerings and attract clients"
        bgColor={variables.color_appricot_100}
        redirectUrl="/"
        buttonLabel="Create service"
      />
    </div>
  );
};
