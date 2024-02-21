import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import variables from 'src/components/_exports.module.scss';
import { isTouchDevice } from 'src/core/device-type-detector';
import { ChatDetails } from 'src/Nowruz/modules/chats/components/chatDetails';
import { NewChat } from 'src/Nowruz/modules/chats/components/newChat';
import { SummaryCard } from 'src/Nowruz/modules/chats/components/summaryCard';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
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
    loadMore,
    justReceived,
    openError,
    setOpenError,
    setChats,
  } = useChats();
  const summaryJSX = (
    <div className={css.summary}>
      <div className="w-full py-5 px-6 flex justify-between items-center">
        <div className="flex gap-2">
          <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">Messages</span>
          <div className="py-0.5 px-1.5 border rounded-sm border-solid border-Gray-light-mode-300 flex items-center justify-center font-medium text-xs leading-[18px] text-Gray-light-mode-700">
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
      <InfiniteScroll
        initialLoad={false}
        threshold={800}
        useWindow={false}
        pageStart={1}
        loadMore={loadMore}
        hasMore={true}
      >
        {chats.map((item) => (
          <SummaryCard
            key={item.id}
            chat={item}
            handleSelect={handleSelectChat}
            isSelected={item.id === selectedChat?.id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
  return (
    <>
      <div className="w-full h-full flex">
        {isTouchDevice() ? (
          openNewChat ? (
            <NewChat handleClose={() => setOpenNewChat(false)} onSend={handleNewChat} />
          ) : openDetails ? (
            <ChatDetails
              selectedChatId={selectedChat?.id || ''}
              chats={chats}
              setChats={setChats}
              setOpenDetails={setOpenDetails}
              newSocketMessage={justReceived}
            />
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
                <ChatDetails
                  selectedChatId={selectedChat?.id || ''}
                  chats={chats}
                  setChats={setChats}
                  setOpenDetails={setOpenDetails}
                  newSocketMessage={justReceived}
                />
              ) : (
                ''
              )}
            </div>
          </>
        ) : (
          ''
        )}
      </div>
      {openError && (
        <AlertModal
          open={openError}
          onClose={() => setOpenError(false)}
          message={'You cannot start a chat with the selected contact'}
          title={'Failed'}
          customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
          closeButtn={false}
          submitButton={false}
        />
      )}
    </>
  );
};
