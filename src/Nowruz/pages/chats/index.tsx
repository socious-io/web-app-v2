import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { isTouchDevice } from 'src/core/device-type-detector';
import { ChatDetails } from 'src/Nowruz/modules/chats/components/chatDetails';
import { NewChat } from 'src/Nowruz/modules/chats/components/newChat';
import { SummaryCard } from 'src/Nowruz/modules/chats/components/summaryCard';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';

import css from './chats.module.scss';
import { useChats } from './useChats';

export const Chats = () => {
  const {
    count,
    chats,
    selectedChat,
    handleSelectChat,
    openDetails,
    setOpenDetails,
    openNewChat,
    setOpenNewChat,
    handleNewChat,
  } = useChats();
  const summaryJSX = (
    <div className={css.summary}>
      <div className="w-full py-5 px-6 flex justify-between">
        <div className="flex gap-2">
          <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">Messages</span>
          <div className="py-0.5 px-1.5 border rounded-sm border-solid border-Gray-light-mode-300 flex items-center justify-center font-medium text-xs text-Gray-light-mode-700">
            {count}
          </div>
        </div>
        <IconButton
          iconColor={variables.color_grey_700}
          iconName="edit-05"
          iconSize={20}
          size="medium"
          customStyle="!border !border-solid !border-Gray-light-mode-300"
          handleClick={() => setOpenNewChat(true)}
        />
      </div>
      {chats.map((item) => (
        <SummaryCard key={item.id} chat={item} handleSelect={handleSelectChat} />
      ))}
    </div>
  );
  return (
    <div className="w-full h-full flex">
      {isTouchDevice() ? (
        openNewChat ? (
          <NewChat handleClose={() => setOpenNewChat(false)} onSend={handleNewChat} />
        ) : openDetails ? (
          <ChatDetails chat={selectedChat} setOpenDetails={setOpenDetails} />
        ) : (
          summaryJSX
        )
      ) : (
        ''
      )}

      {!isTouchDevice() ? (
        <>
          {summaryJSX}
          <div className="flex flex-1">
            {openNewChat ? (
              <NewChat handleClose={() => setOpenNewChat(false)} onSend={handleNewChat} />
            ) : openDetails ? (
              <ChatDetails chat={selectedChat} setOpenDetails={setOpenDetails} />
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};
