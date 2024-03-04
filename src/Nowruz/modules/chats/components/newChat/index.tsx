import React from 'react';
import { SendMessage } from 'src/Nowruz/modules/chats/components/sendMessage';
import { CloseButton } from 'src/Nowruz/modules/general/components/closeButton';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { NewChatProps } from './newChat.types';
import { useNewChat } from './useNewChat';

export const NewChat: React.FC<NewChatProps> = ({ handleClose, onSend }) => {
  const { searchFollowings, selectedContact, onSelect } = useNewChat();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between px-6 py-5 items-center">
        <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">New message</span>
        <CloseButton handleClose={handleClose} />
      </div>
      <div className="px-4 py-5 md:px-6 flex border-t border-b border-r-0 border-l-0 border-solid border-Gray-light-mode-200 items-center">
        <span className="text-base font-normal leading-6 text-Gray-light-mode-600">To:</span>
        <SearchDropdown
          id="contact"
          placeholder="Type a name..."
          cacheOptions
          isAsync
          loadOptions={searchFollowings}
          defaultOptions
          className="w-full"
          hasDropdownIcon={false}
          value={selectedContact}
          onChange={(value) => onSelect(value)}
          border={false}
        />
      </div>
      <div className="px-4 py-5 md:px-6 flex flex-1  overflow-y-auto"></div>
      <div className="w-full h-fit px-4 py-6 md:px-8">
        <SendMessage receipientId={selectedContact?.value || ''} handleCreateChat={onSend} />
      </div>
    </div>
  );
};
