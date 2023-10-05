import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { ChatList } from 'src/components/organisms/chat-list/chat-list';
import { useMessageDetailShared } from 'src/pages/chat/message-detail/message-detail.shared';
import { Header } from 'src/pages/chat/message-detail/mobile/header/header';
import css from 'src/pages/chat/message-detail/mobile/mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const { participantDetail, list, sendingValue, setSendingValue, onSend } = useMessageDetailShared();
  const emptyBoxJSX = (
    <div className={css.emptyBoxContainer}>
      <Avatar
        type={participantDetail.type}
        img={participantDetail.identity_meta.avatar || participantDetail.identity_meta.image}
        size="8rem"
      />
      <div className={css.text}>
        Start chatting with
        <span>{participantDetail.identity_meta.name}</span>
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
          onBack={() => navigate('/d/chats/contacts')}
          type={participantDetail.type}
          name={participantDetail.identity_meta.name}
          img={participantDetail.identity_meta.avatar || participantDetail.identity_meta.image}
          username={participantDetail.identity_meta.username || participantDetail.identity_meta.shortname || ''}
        />
      </div>
      <div id="chat-list-div" className={css.main}>
        {list.length ? <ChatList list={list} /> : emptyBoxJSX}
      </div>
      <div className={css.sendBoxContainer}>
        <SendBox value={sendingValue} onValueChange={setSendingValue} onSend={onSend} />
      </div>
    </div>
  );
};
