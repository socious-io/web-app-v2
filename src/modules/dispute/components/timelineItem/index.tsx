import React from 'react';
import { DisputeEvent, Identity } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { toRelativeTime } from 'src/core/relative-time';
import { truncateFromMiddle } from 'src/core/stringTransformation';
import { UserType } from 'src/core/types';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { ExpandableText } from 'src/modules/general/components/expandableText';

import { useTimelineItem } from './useTimelineItem';

export interface TimelineItemProps {
  event: DisputeEvent;
  displayDivider?: boolean;
  disputeDirection: 'received' | 'submitted' | 'juror';
  respondent: Identity;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  displayDivider = true,
  disputeDirection,
  respondent,
}) => {
  const { name, type, profileImage, myEvent, title, getFileIcon } = useTimelineItem(
    event,
    disputeDirection,
    respondent,
  );
  return (
    <div className="w-full flex gap-3">
      <div className="flex flex-col gap-1 w-fit pb-1">
        <Avatar type={type as UserType} img={profileImage} />
        {displayDivider && (
          <div className="w-1/2 flex-1  border-r-2 border-l-0 border-y-0 border-solid border-Gray-light-mode-200" />
        )}
      </div>
      <div className="flex flex-col gap-3 flex-1 pb-8">
        <div className="flex flex-col h-12 max-h-12 min-h-12 justify-center">
          <div className="flex gap-2 items-center">
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
              customStyle="text-Gray-light-mode-600 text-sm font-normal leading-5"
            />
          </div>
        )}
        {!!event.evidences.length && (
          <div className="flex flex-wrap gap-5">
            {event.evidences?.map(item => {
              const file = getFileIcon(item.url);
              const fileName = file.name?.split('.')[0] || '';
              const fileFormat = file.name?.split('.')[1] || '';
              return (
                <div key={item.id} className="flex gap-3">
                  <img src={file.icon} alt="" />
                  <a
                    href={item.url}
                    download
                    target="_blank"
                    className={`text-sm font-medium leading-5 text-Gray-light-mode-900 cursor-pointer break-words break-all whitespace-normal`}
                    rel="noreferrer"
                  >
                    {fileName && fileFormat ? truncateFromMiddle(fileName, 10, 4) + '.' + fileFormat : file.name}
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
