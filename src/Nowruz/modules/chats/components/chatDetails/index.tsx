import React from 'react';
import { ChatDetailsProps } from './chatDetails.types';
import { useChatDetails } from './useChatDetails';
import ChatDetailItem from '../chatDetailItem';

export const ChatDetails: React.FC<ChatDetailsProps> = ({ chat }) => {
  const { messages } = useChatDetails(chat?.id);
  const avatar = chat?.participants[0].identity_meta.avatar || chat?.participants[0].identity_meta.image || '';
  const type = chat?.participants[0].identity_type;
  const name = chat?.participants[0].identity_meta.name || '';

  return (
    <div className="w-full p-4 md:p-8 flex flex-col gap-6">
      {messages?.map((item) => (
        <ChatDetailItem key={item.id} message={item} senderAvatar={avatar} senderType={type} senderName={name} />
      ))}
    </div>
  );
};
