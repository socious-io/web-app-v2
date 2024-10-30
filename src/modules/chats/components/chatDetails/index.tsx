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
  const { sortedMessages, onSend, account, loadMore, hasMore, onAvatarClick } = useChatDetails(
    selectedChatId,
    chats,
    setChats,
    newSocketMessage,
  );

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
        <AvatarLabelGroup account={account} customStyle="!p-0" handleClick={onAvatarClick} />
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
          {sortedMessages?.map(message => (
            <ChatDetailItem
              key={message.id}
              message={message}
              senderAvatar={account.img}
              senderType={account.type}
              senderName={account.name}
              onAvatarClick={onAvatarClick}
            />
          ))}
        </InfiniteScroll>

        <SendMessage onSend={onSend} />
      </div>
    </div>
  );
};
