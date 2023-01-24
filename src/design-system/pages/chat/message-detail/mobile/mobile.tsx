import css from './mobile.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IdentityReq } from '../../../../../core/types';
import { RootState } from '../../../../../store/store';
import { SendBox } from '../../../../molecules/send-box/send-box';
import { ChatList } from '../../../../organisms/chat-list/chat-list';
import { chatListAdaptor, getParticipantDetail } from '../message-detail.services';
import { MessageLoader } from '../message-detail.types';
import { Header } from './header/header';

export const Mobile = (): JSX.Element => {
  const [sendingValue, setSendingValue] = useState('');
  const navigate = useNavigate();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const { participants, messages } = useMatch<MessageLoader>().data;
  const chatList = chatListAdaptor(identity.id, messages, participants);
  const participantDetail = getParticipantDetail(identity.id, participants);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <Header
          onBack={() => navigate({ to: '/chats/contacts' })}
          type={identity.type}
          name={participantDetail.name}
          img={participantDetail.avatar}
        />
      </div>
      <div className={css.main}>
        <ChatList list={chatList} />
      </div>
      <div className={css.sendBoxContainer}>
        <SendBox value={sendingValue} onValueChange={setSendingValue} onSend={console.log} img="" />
      </div>
    </div>
  );
};
