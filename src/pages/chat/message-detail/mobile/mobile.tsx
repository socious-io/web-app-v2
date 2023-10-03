import { useNavigate } from '@tanstack/react-location';

import { Header } from './header/header';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { ChatList } from 'src/components/organisms/chat-list/chat-list';
import { useMessageDetailShared } from '../message-detail.shared';
import css from './mobile.module.scss';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { useEffect } from 'react';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const { participantDetail, list, sendingValue, setSendingValue, onSend } = useMessageDetailShared();

  const emptyBoxJSX = (
    <div className={css.emptyBoxContainer}>
      <Avatar type={participantDetail.type} img={participantDetail.avatar || participantDetail?.image} size="8rem" />
      <div className={css.text}>
        Start chatting with
        <span>{participantDetail.name}</span>
      </div>
    </div>
  );

  useEffect(() => {
    const messageBody = document.getElementById('chat-list-div');
    if (messageBody) messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }, [list]);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <Header
          onBack={() => navigate({ to: '/chats/contacts' })}
          type={participantDetail.type}
          name={participantDetail.name}
          img={participantDetail.avatar || participantDetail?.image}
          username={participantDetail.username || participantDetail?.shortname}
        />
      </div>
      <div id="chat-list-div" className={css.main}>{list.length ? <ChatList list={list} /> : emptyBoxJSX}</div>
      <div className={css.sendBoxContainer}>
        <SendBox value={sendingValue} onValueChange={setSendingValue} onSend={onSend} />
      </div>
    </div>
  );
};
