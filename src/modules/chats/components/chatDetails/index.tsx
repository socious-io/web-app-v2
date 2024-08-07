import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { SendMessage } from 'src/modules/chats/components/sendMessage';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { IconButton } from 'src/modules/general/components/iconButton';
import variables from 'src/styles/constants/_exports.module.scss';

import { ChatDetailsProps } from './chatDetails.types';
import { useChatDetails } from './useChatDetails';
import ChatDetailItem from '../chatDetailItem';

export const ChatDetails: React.FC<ChatDetailsProps> = ({
  selectedChatId,
  chats,
  setOpenDetails,
  newSocketMessage,
  setChats,
}) => {
  const { messages, onSend, account, loadMore, hasMore, page, setMessages } = useChatDetails(
    selectedChatId,
    chats,
    setChats,
  );

  const sorted = messages?.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? 1 : -1));

  useEffect(() => {
    if (page === 1) {
      const messageBody = document.getElementById('chat-list-div');
      if (messageBody) messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (newSocketMessage && !messages.find(item => item.id === newSocketMessage.id)) {
      setMessages([...messages, newSocketMessage]);
    }
  }, [newSocketMessage]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pl-0 pr-4 md:px-6 py-5 flex">
        <div className="flex md:hidden">
          <IconButton
            size="medium"
            iconName="chevron-left"
            iconSize={20}
            iconColor={variables.color_grey_600}
            handleClick={() => setOpenDetails(false)}
          />
        </div>
        <AvatarLabelGroup account={account} customStyle="!p-0" />
      </div>
      <div id="chat-list-div" className="w-full p-4 md:p-8 flex-1 flex flex-col gap-6 overflow-y-auto">
        <InfiniteScroll
          initialLoad={false}
          threshold={150}
          useWindow={false}
          pageStart={1}
          loadMore={loadMore}
          hasMore={hasMore}
          isReverse
          className="flex-1"
        >
          {sorted?.map((item, index) => (
            <ChatDetailItem
              key={item.id}
              message={item}
              senderAvatar={account.img}
              senderType={account.type}
              senderName={account.name}
            />
          ))}
        </InfiniteScroll>

        <SendMessage onSend={onSend} />
      </div>
    </div>
  );
};
