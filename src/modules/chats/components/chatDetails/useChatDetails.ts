import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Chat, CurrentIdentity, Message, OrgMeta, UserMeta, chatMessages, createChatMessage } from 'src/core/api';
import { RootState } from 'src/store';

export const useChatDetails = (selectedChatId: string, chats: Chat[], setChats: (val: Chat[]) => void) => {
  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const chat = chats.find(item => item.id === selectedChatId);
  const participant = chat?.participants[0];
  const account = {
    id: participant?.identity_meta?.id || '',
    img: (participant?.identity_meta as UserMeta).avatar || (participant?.identity_meta as OrgMeta).image || '',
    type: participant?.identity_type || 'users',
    name: participant?.identity_meta?.name || '',
    username:
      (participant?.identity_meta as UserMeta).username || (participant?.identity_meta as OrgMeta).shortname || '',
  };

  const updateUnreadCount = () => {
    const chatList = [...chats];
    const index = chatList.findIndex(item => item.id === selectedChatId);
    let unread = Number(chatList[index].unread_count);
    unread = unread > 10 ? unread - 10 : 0;
    chatList[index].unread_count = unread.toString();
    setChats(chatList);
  };
  const getMessages = async () => {
    if (selectedChatId) {
      setPage(1);
      sethasMore(true);
      const res = await chatMessages(selectedChatId, { page: 1 });
      setMessages(res.items);
      updateUnreadCount();
    }
  };
  useEffect(() => {
    getMessages();
  }, [selectedChatId]);

  const onSend = async (message: string) => {
    if (!selectedChatId || !currentIdentity) return;
    const resp = await createChatMessage(selectedChatId, { text: message });
    const msgList = (messages ? [...messages] : []).concat(resp);
    setMessages(msgList);
  };

  const loadMore = async () => {
    if (hasMore)
      chatMessages(selectedChatId, { page: page + 1 }).then(resp => {
        const newList = resp.items;
        if (newList.length) {
          setMessages([...messages, ...newList]);
          setPage(page + 1);
          updateUnreadCount();
        } else {
          sethasMore(false);
        }
      });
  };

  const onAvatarClick = () => {
    if (account.type === 'users') navigate(`/profile/users/${account.username}/view`);
    else navigate(`/profile/organizations/${account.username}/view`);
  };

  return { messages, setMessages, onSend, account, loadMore, hasMore, page, onAvatarClick };
};
