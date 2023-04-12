import css from './mobile.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IdentityReq } from '../../../../core/types';
import { RootState } from '../../../../store/store';
import { SendBox } from '../../../../components/molecules/send-box/send-box';
import { ChatList } from '../../../../components/organisms/chat-list/chat-list';
import { chatListAdaptor, getParticipantDetail, onPostMessage } from '../message-detail.services';
import { MessageLoader } from '../message-detail.types';
import { Header } from './header/header';
import { socket } from 'src/core/socket';

export const Mobile = (): JSX.Element => {
  const [sendingValue, setSendingValue] = useState('');
  const navigate = useNavigate();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const resolver = useMatch<MessageLoader>();
  const id = resolver.params.id;
  const { messages, participants } = resolver.data;
  const chatList = chatListAdaptor(identity.id, messages!.items, participants!.items);
  const participantDetail = getParticipantDetail(identity.id, participants!.items);
  const [list, setList] = useState(chatList);

  function onSend() {
    const params = { id, identity, text: sendingValue };
    onPostMessage(params)
      .then((resp) => setList([...list, resp]))
      .then(() => setSendingValue(''));
  }

  socket?.on('chat', (data) => {
    const receiver = list.filter((l) => l.type == 'receiver')[0];
    setList([
      ...list,
      {
        id: data.id,
        identityType: receiver.identityType,
        img: receiver?.img,
        text: data.text,
        type: 'receiver',
      },
    ]);
  });

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
        <ChatList list={list} />
      </div>
      <div className={css.sendBoxContainer}>
        <SendBox value={sendingValue} onValueChange={setSendingValue} onSend={onSend} />
      </div>
    </div>
  );
};
