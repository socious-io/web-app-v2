import React from 'react';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { ToggleButton } from 'src/Nowruz/modules/general/components/toggleButton';

import { useContributorDashboard } from './useContributorDashboard';

interface ContributorDashboardProps {
  newlyJoined: boolean;
}

export const ContributorDashboard: React.FC<ContributorDashboardProps> = ({ newlyJoined }) => {
  const { stopNotif, setStopNotif } = useContributorDashboard();
  return (
    <div className="px-0 pt-4xl pb-6xl flex flex-col gap-4xl">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between pb-2xl border border-solid border-t-0 border-x-0 border-b-Gray-light-mode-200">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold leading-[38px] text-Gray-light-mode-900">Your Contributor Dashboard</h1>
          <h2 className="text-base font-normal leading-6 text-Gray-light-mode-600">
            From here, you can manage your tasks and grow as a valued member of our community.
          </h2>
        </div>
        <div className="w-full md:w-fit p-4 flex gap-md border border-solid border-Gray-light-mode-200 rounded-xl">
          <ToggleButton checked={stopNotif} onChange={() => setStopNotif(!stopNotif)} size="small" />
          <span className="text-sm font-medium leading-5 text-Gray-light-mode-700">
            Stop receiving new task notifications
          </span>
        </div>
      </div>
      {newlyJoined && (
        <AlertMessage
          theme="success"
          iconName="check-circle"
          title="Thank you for joining the Socious Contributor program!"
          subtitle="Your dedication and expertise are invaluable in maintaining the integrity and growth of our platform. Let's work together to make a lasting impact on the Socious community."
          colOrderMobileView
        />
      )}
    </div>
  );
};
