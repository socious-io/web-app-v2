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
  otherProfile,
  getOrganization,
  User,
  Organization,
} from 'src/core/api';
import { socket } from 'src/core/socket';
import { getIdentityMeta } from 'src/core/utils';
import store, { RootState } from 'src/store';
import { getUnreadCount } from 'src/store/thunks/chat.thunk';

export const useChats = () => {
  const { summary } = useLoaderData() as { summary: ChatsRes };
  const [searchParams] = useSearchParams();

  const participantId = searchParams.get('participantId') || '';
  const [chats, setChats] = useState<Chat[]>(summary.items);
  const [chatParams, setChatParams] = useState({ page: 1, filter: '' });
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [openDetails, setOpenDetails] = useState(false);
  const [openNewChat, setOpenNewChat] = useState(false);
  const [justReceived, setJustReceived] = useState<Message | null>(null);
  const [openError, setOpenError] = useState(false);

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const count = useSelector<RootState, string>((state) => {
    return state.chat.unreadCount;
  });

  const openChatWithParticipantId = async (id: string) => {
    let chat = chats.find((item) => item.participants.map((p) => p.identity_meta.id).includes(id));
    if (!chat) {
      const created = await createChat({
        name: 'nameless',
        type: 'CHAT',
        participants: [id],
      });

      let participantDeatils: User | Organization | null = null;
      try {
        participantDeatils = await getOrganization(id);
      } catch {
        participantDeatils = await otherProfile(id);
      }
      const { name, type, profileImage, username } = getIdentityMeta(participantDeatils);
      const newParticipant = {
        identity_meta: {
          id: participantDeatils.id,
          address: participantDeatils.address,
          email: participantDeatils.email,
          name: name,
        },
        identity_type: type,
        type: 'MEMBER',
      };
      if (type === 'users') {
        newParticipant.identity_meta.avatar = profileImage;
        newParticipant.identity_meta.username = username;
      } else {
        newParticipant.identity_meta.image = profileImage;
        newParticipant.identity_meta.shortname = username;
      }
      chat = {
        ...created,
        participants: [newParticipant],
      };
      setChats([chat].concat(chats));
    }
    setSelectedChat(chat);
    setOpenNewChat(false);
    setOpenDetails(true);
  };

  useEffect(() => {
    if (participantId) openChatWithParticipantId(participantId);
  }, [participantId]);

  useEffect(() => {
    store.dispatch(getUnreadCount());
  }, [chats]);

  const handleSelectChat = (id: string) => {
    setOpenNewChat(false);
    setOpenDetails(true);
    setSelectedChat(chats.find((item) => item.id === id));
  };

  const handleNewChat = async (receiverId: string, text: string) => {
    if (!receiverId || !currentIdentity) return;
    const foundChat = chats.find((item) => item.participants[0].identity_meta.id === receiverId);
    if (foundChat) {
      await createChatMessage(foundChat.id, { text });
      setSelectedChat(foundChat);
      setOpenNewChat(false);
      setOpenDetails(true);
      return;
    }
    try {
      const chatRes = await createChat({ name: 'nameless', type: 'CHAT', participants: [receiverId] });
      await createChatMessage(chatRes.id, { text });
      const chatList = await chatsApi({ page: 1 });
      setChats(chatList.items);
      setSelectedChat(chatRes);
      setOpenNewChat(false);
      setOpenDetails(true);
    } catch (e) {
      setOpenError(true);
    }
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
    openError,
    setOpenError,
    setChats,
  };
};
