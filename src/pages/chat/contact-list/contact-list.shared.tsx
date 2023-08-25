import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { ContactItem } from '@molecules/contact-item/contact-item.types';
import { Resolver } from './contact-list.types';
import {
  chatEntityToContactListAdaptor,
  convertFollowingsToContactList,
  getChatsSummery,
  getFollowings,
} from './contact-list.services';
import { createChats, postFind } from '../new-chat/new-chat.services';

export const useContactListShared = () => {
  const navigate = useNavigate();
  const resolver = useMatch().ownData as Resolver;
  const { summery, followings } = resolver || {};
  const initialState = chatEntityToContactListAdaptor(summery?.items);
  const initialList = convertFollowingsToContactList(followings?.items);
  const [chats, setChats] = useState<ContactItem[]>(initialState);
  const [state, setState] = useState({ page: 1, filter: '' });
  const [openCreateChatModal, setOpenCreateChatModal] = useState(false);
  const [userList, setUserList] = useState(initialList);

  function onSearch(value: string) {
    const payload = { page: 1, filter: value };
    getChatsSummery(payload).then((resp) => {
      setChats(chatEntityToContactListAdaptor(resp.items));
      setState(payload);
    });
  }

  function onCreateSearch(value: string) {
    const payload = { name: value };
    getFollowings(payload)
      .then(({ items }) => convertFollowingsToContactList(items))
      .then(setUserList);
  }

  function onScroll(page: number) {
    const payload = { ...state, page: state.page + 1 };
    getChatsSummery(payload).then((resp) => {
      const newList = chatEntityToContactListAdaptor(resp.items);
      setChats([...chats, ...newList]);
      setState(payload);
    });
  }

  async function onCreateChat(id: string) {
    const createdChats = await createChats({ name: 'nameless', type: 'CHAT', participants: [id] });
    setOpenCreateChatModal(false);
    navigate({ to: `${createdChats?.id}` });
  }

  return {
    chats,
    onScroll,
    onSearch,
    openCreateChatModal,
    setOpenCreateChatModal,
    onCreateSearch,
    userList,
    onCreateChat,
  };
};
