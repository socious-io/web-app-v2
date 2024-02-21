import React from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { RootState } from 'src/store';

import css from './chatDetailItem.module.scss';
import { ChatDetailItemProps } from './chatDetailItem.types';

export const ChatDetailItem: React.FC<ChatDetailItemProps> = ({
  message,
  senderAvatar,
  senderName,
  senderType,
  className,
}) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const isMine = message.identity_id === currentIdentity?.id;
  return (
    <div className={`flex mb-4 ${isMine ? 'justify-end' : 'justify-start'} ${className}`}>
      {isMine ? (
        <div className="flex flex-col gap-1.5 items-end">
          <div className="flex justify-between items-center gap-2">
            <span className="font-medium text-sm leading-5 text-Gray-light-mode-700">You</span>
            <span className="font-normal text-xs leading-[18px] text-Gray-light-mode-600">
              {toRelativeTime(message.updated_at)}
            </span>
          </div>
          <div className={css.myMessage}>{message.text}</div>
        </div>
      ) : (
        <div className="flex gap-3">
          <Avatar img={senderAvatar} type={senderType || 'users'} size="40px" />
          <div className="flex flex-col gap-1.5 items-start">
            <div className="flex justify-between items-center gap-2">
              <span className="font-medium text-sm leading-5 text-Gray-light-mode-700">{senderName}</span>
              <span className="font-normal text-xs leading-[18px] text-Gray-light-mode-600">
                {toRelativeTime(message.updated_at)}
              </span>
            </div>
            <div className={css.otherMessage}>{message.text}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDetailItem;
