import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ContactItem } from 'src/components/molecules/contact-item/contact-item.types';
import { filterChats, filterFollowings, createChat } from 'src/core/api';
import {
  chatEntityToContactListAdaptor,
  convertFollowingsToContactList,
} from 'src/pages/chat/contact-list/contact-list.services';
import { Resolver } from 'src/pages/chat/contact-list/contact-list.types';

export const useContactListShared = () => {
  const navigate = useNavigate();

  const resolver = useLoaderData() as Resolver;
  const { summery, followings } = resolver || {};
  const initialState = chatEntityToContactListAdaptor(summery?.items);
  const initialList = convertFollowingsToContactList(followings?.items);
  const [chats, setChats] = useState<ContactItem[]>(initialState);
  const [state, setState] = useState({ page: 1, filter: '' });
  const [openCreateChatModal, setOpenCreateChatModal] = useState(false);
  const [userList, setUserList] = useState(initialList);

  function onSearch(value: string) {
    const payload = { page: 1, filter: value };
    filterChats(payload).then((resp) => {
      setChats(chatEntityToContactListAdaptor(resp.items));
      setState(payload);
    });
  }

  function onCreateSearch(value: string) {
    const payload = { filter: value };
    filterFollowings(payload)
      .then(({ items }) => convertFollowingsToContactList(items))
      .then(setUserList);
  }

  function onScroll(page: number) {
    const payload = { ...state, page: state.page + 1 };
    filterChats(payload).then((resp) => {
      const newList = chatEntityToContactListAdaptor(resp.items);
      setChats([...chats, ...newList]);
      setState(payload);
    });
  }

  async function onCreateChat(id: string) {
    const createdChats = await createChat({ name: 'nameless', type: 'CHAT', participants: [id] });
    setOpenCreateChatModal(false);
    navigate(`/d/chats/contacts/${createdChats?.id}`);
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
