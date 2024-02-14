import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import {
  Chat,
  ChatsRes,
  CurrentIdentity,
  FollowingRes,
  createChat,
  createChatMessage,
  chats as chatsApi,
} from 'src/core/api';
import { RootState } from 'src/store';

export const useChats = () => {
  const { summary, followings } = useLoaderData() as { summary: ChatsRes; followings: FollowingRes };
  const [chats, setChats] = useState<Chat[]>(summary.items);
  const [count, setCount] = useState(summary.total_count);

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
    setSelectedChat(chatRes);
    setOpenNewChat(false);
    setOpenDetails(true);
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
  };
};
