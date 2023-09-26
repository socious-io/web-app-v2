import { Avatar } from 'src/components/atoms/avatar/avatar';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { ChatList } from 'src/components/organisms/chat-list/chat-list';

import { Header } from './header/header';
import css from './mobile.module.scss';
import { useMessageDetailShared } from '../message-detail.shared';

export const Mobile = (): JSX.Element => {
  const navigate = {};
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
      <div className={css.main}>{list.length ? <ChatList list={list} /> : emptyBoxJSX}</div>
      <div className={css.sendBoxContainer}>
        <SendBox value={sendingValue} onValueChange={setSendingValue} onSend={onSend} />
      </div>
    </div>
  );
};
