import { Divider } from '@mui/material';
import React from 'react';
import { DisputeEvent } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { toRelativeTime } from 'src/core/relative-time';
import { UserType } from 'src/core/types';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';

import { useTimelineItem } from './useTimelineItem';

export interface TimelineItemProps {
  event: DisputeEvent;
  displayDivider?: boolean;
  disputeDirection: 'received' | 'submitted' | 'juror';
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, displayDivider = true, disputeDirection }) => {
  const { name, type, profileImage, myEvent, getEventTitle, getFileIcon } = useTimelineItem(event, disputeDirection);
  const title = getEventTitle();
  return (
    <div className="w-full flex gap-3">
      <div className="flex flex-col w-fit">
        <Avatar type={type as UserType} img={profileImage} />

        <div className="w-1/2 flex-1 ">{displayDivider && <Divider orientation="vertical" />}</div>
      </div>
      <div className="flex flex-col gap-3 w-full pb-8">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <span className="text-sm font-medium leading-5 text-Gray-light-mode-700">{myEvent ? 'You' : name}</span>
            <span className="text-xs font-medium leading-[18px] text-Gray-light-mode-600">
              {toRelativeTime(event.created_at.toString())}
            </span>
          </div>

          <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">
            {`${title.text} `}
            {title.supportingText && <span className="text-Brand-700">{title.supportingText}</span>}
          </span>
        </div>
        {!!event.message && (
          <div className="border border-solid border-Gray-light-mode-200 rounded-default rounded-tl-none px-3 py-2.5 ">
            <ExpandableText
              text={event.message}
              isMarkdown
              expectedLength={isTouchDevice() ? 140 : 240}
              seeMoreText="See more"
            />
          </div>
        )}
        {!!event.evidences.length && (
          <div className="flex flex-wrap gap-5">
            {event.evidences?.map(item => {
              const file = getFileIcon(item.url);
              return (
                <div key={item.id} className="flex gap-3">
                  <img src={file.icon} alt="" />
                  <a
                    href={item.url}
                    download
                    target="_blank"
                    className="text-sm font-medium leading-5 text-Gray-light-mode-900 cursor-pointer"
                    rel="noreferrer"
                  >
                    {file.name}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
