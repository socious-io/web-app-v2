import React from 'react';
import { Mission, Offer } from 'src/core/api';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';

import { useCompleteJob } from './useCompleteJob';

interface CompleteJobProps {
  offer: Offer;
  mission: Mission;
}

export const CompleteJob: React.FC<CompleteJobProps> = ({ offer, mission }) => {
  const { profileImage, name, tabs, stopped, completed, handleComplete, handleStop } = useCompleteJob(offer, mission);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 ">
          <Avatar size="72px" type="organizations" img={profileImage} />
          <div className="flex flex-col">
            <span className="font-semibold text-2xl leading-8 text-Gray-light-mode-900">{offer.project.title}</span>
            <span className="font-normal text-base leading-6 text-Gray-light-mode-600">{name}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outlined" color="secondary" fullWidth>
            Message
          </Button>
          {!stopped && !completed && (
            <Button variant="outlined" color="secondary" fullWidth onClick={handleStop}>
              Stop
            </Button>
          )}
        </div>
        {!stopped && !completed && (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Complete
          </Button>
        )}
        {!stopped && !completed && (
          <AlertMessage
            theme="primary"
            iconName="check-circle"
            title="Your job has been confirmed"
            subtitle="Once you have finished your work please click on complete button."
          />
        )}
        {completed && (
          <AlertMessage
            theme="warning"
            iconName="alert-circle"
            title="Completion submitted"
            subtitle={`Awaiting confirmation from ${name}`}
          />
        )}
        <HorizontalTabs tabs={tabs} leftAligned={false} containerCustomStyle="gap-0" />
      </div>
    </div>
  );
};
