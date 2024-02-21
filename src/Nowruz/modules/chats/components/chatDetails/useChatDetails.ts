import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chat, CurrentIdentity, Message, chatMessages, createChatMessage } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';

export const useChatDetails = (chat?: Chat) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const [messages, setMessages] = useState<Message[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const id = chat?.id || '';
  const participant = chat?.participants[0];
  const account = {
    id: participant?.identity_meta.id,
    img: participant?.identity_meta.image || participant?.identity_meta.avatar || '',
    type: participant?.identity_type,
    name: participant?.identity_meta.name,
    username: participant?.identity_meta.username || participant?.identity_meta.shortname || '',
  };
  const getMessages = async () => {
    if (id) {
      setPage(1);
      sethasMore(true);
      const res = await chatMessages(id, { page: 1 });
      setMessages(res.items);
    }
  };
  useEffect(() => {
    getMessages();
  }, [id]);

  const onSend = async (message: string) => {
    if (!id || !currentIdentity) return;
    const resp = await createChatMessage(id, { text: message });
    const msgList = (messages ? [...messages] : []).concat(resp);
    setMessages(msgList);
  };

  const loadMore = async () => {
    if (hasMore)
      chatMessages(id, { page: page + 1 }).then((resp) => {
        const newList = resp.items;
        if (newList.length) {
          setMessages([...messages, ...newList]);

          setPage(page + 1);
        } else {
          sethasMore(false);
        }
      });
  };
  return { messages, setMessages, onSend, account, loadMore, hasMore, page };
};
