import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './sendMessage.module.scss';

interface SendMessageProps {
  receipientId?: string;
  onSend?: (message: string) => void;
  handleCreateChat?: (receipientId: string, text: string) => void;
}
export const SendMessage: React.FC<SendMessageProps> = ({ onSend, handleCreateChat, receipientId }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (onSend) await onSend(newMessage);
    else if (handleCreateChat && receipientId) await handleCreateChat(receipientId, newMessage);
    setNewMessage('');
  };

  const enterInput = (e: any) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  return (
    <>
      <div className={`hidden md:flex ${css.sendBox}`}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={css.inputMessage}
          placeholder="Send a message"
          onKeyDown={((e) => enterInput(e))}
        />

        <Button
          variant="contained"
          color="primary"
          customStyle="absolute right-[14px] bottom-[14px]"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
      <div className={`flex md:hidden py-6 gap-3`}>
        <div className="flex-1">
          <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Send a message" onKeyDown={((e) => enterInput(e))}/>
        </div>
        <IconButton
          size="medium"
          iconName="send-01"
          iconSize={20}
          iconColor={variables.color_white}
          handleClick={handleSendMessage}
          customStyle="!bg-Brand-600"
        />
      </div>
    </>
  );
};
