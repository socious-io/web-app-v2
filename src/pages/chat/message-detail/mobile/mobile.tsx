import { useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { ChatList } from 'src/components/organisms/chat-list/chat-list';
import { useMessageDetailShared } from 'src/pages/chat/message-detail/message-detail.shared';
import { Header } from 'src/pages/chat/message-detail/mobile/header/header';
import css from 'src/pages/chat/message-detail/mobile/header/mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const { participantDetail, list, sendingValue, setSendingValue, onSend } = useMessageDetailShared();

  const emptyBoxJSX = (
    <div className={css.emptyBoxContainer}>
      <Avatar
        type={participantDetail.type}
        img={
          'avatar' in participantDetail.meta
            ? participantDetail.meta.avatar
            : 'image' in participantDetail.meta
            ? participantDetail.meta.image
            : ''
        }
        size="8rem"
      />
      <div className={css.text}>
        Start chatting with
        <span>{participantDetail.meta.name}</span>
      </div>
    </div>
  );

  return (
    <div className={css.container}>
      <div className={css.header}>
        <Header
          onBack={() => navigate('/chats/contacts')}
          type={participantDetail.type}
          name={participantDetail.meta.name}
          img={
            'avatar' in participantDetail.meta
              ? participantDetail.meta.avatar
              : 'image' in participantDetail.meta
              ? participantDetail.meta.image
              : ''
          }
          username={
            'username' in participantDetail.meta
              ? participantDetail.meta.username
              : 'shortname' in participantDetail.meta
              ? participantDetail.meta.shortname
              : ''
          }
        />
      </div>
      <div className={css.main}>{list.length ? <ChatList list={list} /> : emptyBoxJSX}</div>
      <div className={css.sendBoxContainer}>
        <SendBox value={sendingValue} onValueChange={setSendingValue} onSend={onSend} />
      </div>
    </div>
  );
};
