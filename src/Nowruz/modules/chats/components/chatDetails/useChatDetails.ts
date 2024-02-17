import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, Message, chatMessages, createChatMessage } from 'src/core/api';
import { socket } from 'src/core/socket';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';

export const useChatDetails = (id?: string) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const { profileImage, type, name, username } = getIdentityMeta(currentIdentity);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const account = {
    id,
    img: profileImage,
    type,
    name,
    username,
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

  socket?.on('chat', (data) => {
    const msg = messages?.filter((m) => m.id === data.id);
    if (msg.length) return;
    setMessages([...messages, data]);
  });

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
  return { messages, onSend, account, loadMore, hasMore, page };
};
