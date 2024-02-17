import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import {
  Chat,
  ChatsRes,
  CurrentIdentity,
  createChat,
  createChatMessage,
  chats as chatsApi,
  filterChats,
} from 'src/core/api';
import { RootState } from 'src/store';

export const useChats = () => {
  const { summary } = useLoaderData() as { summary: ChatsRes };
  const [chats, setChats] = useState<Chat[]>(summary.items);
  const [count, setCount] = useState(summary.total_count);
  const [chatParams, setChatParams] = useState({ page: 1, filter: '' });
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [openDetails, setOpenDetails] = useState(false);
  const [openNewChat, setOpenNewChat] = useState(false);

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const handleSelectChat = (id: string) => {
    setOpenNewChat(false);
    setOpenDetails(true);
    setSelectedChat(chats.find((item) => item.id === id));
  };

  const handleNewChat = async (receiverId: string, text: string) => {
    if (!receiverId || !currentIdentity) return;
    const chatRes = await createChat({ name: 'nameless', type: 'CHAT', participants: [receiverId] });
    await createChatMessage(chatRes.id, { text });
    const chatList = await chatsApi({ page: 1 });
    setChats(chatList.items);
    setCount(chatList.items.length);
    setSelectedChat(chatRes);
    setOpenNewChat(false);
    setOpenDetails(true);
  };

  const loadMore = async (page: number) => {
    const payload = { ...chatParams, page: chatParams.page + 1 };
    filterChats(payload).then((resp) => {
      const newList = resp.items;
      setChats([...chats, ...newList]);
      setChatParams(payload);
    });
  };
  return {
    count,
    chats,
    selectedChat,
    handleSelectChat,
    openDetails,
    setOpenDetails,
    openNewChat,
    setOpenNewChat,
    handleNewChat,
    loadMore,
  };
};
