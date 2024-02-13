import React from 'react';
import { SummaryCard } from 'src/Nowruz/modules/chats/components/summaryCard';

import css from './chats.module.scss';
import { useChats } from './useChats';
import { ChatDetails } from 'src/Nowruz/modules/chats/components/chatDetails';

export const Chats = () => {
  const { count, chats, selectedChat, handleSelectChat } = useChats();
  return (
    <div className="w-full h-full flex">
      <div className={css.summary}>
        <div className="py-5 px-6 flex justify-between">
          <div className="flex gap-2">
            <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">Messages</span>
            <div className="py-0.5 px-1.5 border rounded-sm border-solid border-Gray-light-mode-300 flex items-center justify-center font-medium text-xs text-Gray-light-mode-700">
              {count}
            </div>
          </div>
        </div>
        {chats.map((item) => (
          <SummaryCard key={item.id} chat={item} handleSelect={handleSelectChat} />
        ))}
      </div>
      <div className="hidden md:flex flex-1">
        <ChatDetails chat={selectedChat} />
      </div>
    </div>
  );
};
