import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import {
  Chat,
  ChatsRes,
  CurrentIdentity,
  createChat,
  createChatMessage,
  chats as chatsApi,
  filterChats,
  Message,
  findChat,
} from 'src/core/api';
import { socket } from 'src/core/socket';
import { RootState } from 'src/store';

export const useChats = () => {
  const { summary } = useLoaderData() as { summary: ChatsRes };
  const [searchParams] = useSearchParams();

  const participantId = searchParams.get('participantId') || '';
  const [chats, setChats] = useState<Chat[]>(summary.items);
  const [count, setCount] = useState(summary.total_count);
  const [chatParams, setChatParams] = useState({ page: 1, filter: '' });
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [openDetails, setOpenDetails] = useState(false);
  const [openNewChat, setOpenNewChat] = useState(false);
  const [justReceived, setJustReceived] = useState<Message | null>(null);

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const openChatWithParticipantId = async (id: string) => {
    let chat = chats.find((item) => item.participants.map((p) => p.identity_meta.id).includes(id));
    if (!chat) {
      chat = (await findChat({ participants: [id] })).items[0];
      if (!chat) {
        chat = await createChat({
          name: 'nameless',
          type: 'CHAT',
          participants: [id],
        });
      }

      setChats([chat].concat(chats));
    }
    setSelectedChat(chat);
    setOpenNewChat(false);
    setOpenDetails(true);
  };

  useEffect(() => {
    if (participantId) openChatWithParticipantId(participantId);
  }, [participantId]);

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

  socket?.on('chat', (data) => {
    const receiver = chats.filter((l) => l.id === data.chat_id);
    if (!receiver || data.identity_id === currentIdentity!.id) return;
    const chatIndex = chats.findIndex((item) => item.id === data.chat_id);
    let chatsVal = [...chats];
    if (chatIndex > -1) {
      const chat = chats[chatIndex];
      const newChatItem: Chat = {
        ...chat,
        updated_at: data.updated_at,
        last_message: data,
        message_count: chat.message_count + 1,
        unread_count: selectedChat?.id === data.chat_id ? '0' : (Number(chat.unread_count) + 1).toString(),
      };
      chatsVal.splice(chatIndex, 1);
      chatsVal = [newChatItem].concat(chatsVal);

      setChats(chatsVal);
      if (data.chat_id === selectedChat?.id) setJustReceived(data);
      else setJustReceived(null);
    }
  });
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
    justReceived,
  };
};
