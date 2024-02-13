import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Chat, ChatsRes, FollowingRes } from 'src/core/api';

export const useChats = () => {
  const { summary, followings } = useLoaderData() as { summary: ChatsRes; followings: FollowingRes };
  const [selectedChat, setSelectedChat] = useState<Chat>();

  const handleSelectChat = (id: string) => {
    setSelectedChat(summary.items.find((item) => item.id === id));
  };

  return { count: summary.total_count, chats: summary.items, selectedChat, handleSelectChat };
};
