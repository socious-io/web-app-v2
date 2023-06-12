import { useMatch, useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { socket } from 'src/core/socket';
import { IdentityReq } from 'src/core/types';
import { MessageLoader } from './message-detail.types';
import {
  chatListAdaptor,
  getMessagesById,
  getParticipantDetail,
  getParticipantsById,
  onPostMessage,
} from './message-detail.services';
import { ContactItem } from 'src/components/molecules/contact-item/contact-item.types';

export const useMessageDetailShared = () => {
  const navigate = useNavigate();
  const [sendingValue, setSendingValue] = useState('');
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

  async function onContactClick(contact: ContactItem) {
    navigate({ to: `../${contact.id}` });
    setList([]);
    const messages = await getMessagesById({ id: contact.id, page: 1 });
    const participants = await getParticipantsById(id);
    const chatList = chatListAdaptor(identity.id, messages!.items, participants!.items);
    setList(chatList);
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

  return { participantDetail, list, sendingValue, setSendingValue, onSend, onContactClick };
};
