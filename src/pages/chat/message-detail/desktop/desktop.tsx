import { useState } from 'react';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { Fab } from 'src/components/atoms/fab/fab';
import { ContactItem } from 'src/components/molecules/contact-item/contact-item.types';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { ChatList } from 'src/components/organisms/chat-list/chat-list';
import { ContactList } from 'src/components/organisms/contact-list/contact-list';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { useAuth } from 'src/hooks/use-auth';

import css from './desktop.module.scss';
import { Header } from './header';
import {
  chatEntityToContactListAdaptor,
  convertFollowingsToContactList,
  getChatsSummery,
  getFollowings,
} from '../../contact-list/contact-list.services';
import { CreateChatModal } from '../../contact-list/create-chat-modal';
import { createChats } from '../../new-chat/new-chat.services';
import { useMessageDetailShared } from '../message-detail.shared';
import { MessageLoader } from '../message-detail.types';

export const Desktop = (): JSX.Element => {
  const navigate = {};
  const resolver = useMatch<MessageLoader>();
  const { isLoggedIn } = useAuth();
  const { summery, followings } = resolver.data || {};
  const {
    participantDetail,
    list,
    sendingValue,
    setSendingValue,
    onSend,
    onContactClick,
    updateMessages,
    loadingChat,
  } = useMessageDetailShared();
  const initialState = chatEntityToContactListAdaptor(summery?.items);
  const initialList = convertFollowingsToContactList(followings?.items);
  const [chats, setChats] = useState<ContactItem[]>(initialState);
  const [state, setState] = useState({ page: 1, filter: '' });
  const [userList, setUserList] = useState(initialList);
  const [openCreateChatModal, setOpenCreateChatModal] = useState(false);

  function updateChatList() {
    const payload = { page: 1, filter: '' };
    getChatsSummery(payload).then((resp) => {
      setChats(chatEntityToContactListAdaptor(resp.items));
    });
  }

  function onSearch(value: string) {
    const payload = { page: 1, filter: value };
    getChatsSummery(payload).then((resp) => {
      setChats(chatEntityToContactListAdaptor(resp.items));
      setState(payload);
    });
  }

  function onCreateSearch(value: string) {
    const payload = { page: 1, name: value };
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
    navigate({ to: `../${createdChats?.id}` });
    updateMessages(createdChats?.id);
    updateChatList();
  }

  const emptyBoxJSX = (
    <div className={css.emptyBoxContainer}>
      <Avatar type={participantDetail.type} img={participantDetail.avatar || participantDetail?.image} size="8rem" />
      <div className={css.text}>
        Start chatting with
        <span>{participantDetail.name}</span>
      </div>
    </div>
  );

  return (
    <div className={css.container}>
      <TwoColumnCursor visibleSidebar={isLoggedIn} height="100%">
        <div className={css.leftContainer}>
          <Card className={css.card}>
            <div className={css.card__header}>Chats</div>
            <ContactList
              height="calc(var(--window-height) - 6.2rem)"
              onScroll={onScroll}
              onContactClick={(contact) => {
                onContactClick(contact);
                updateChatList();
              }}
              list={chats}
              onSearch={onSearch}
              profileViewWidth={175}
            />
            <Fab onClick={() => setOpenCreateChatModal(true)} className={css.card__fab} />
          </Card>
        </div>
        <Card className={css.rightContainer}>
          <Header
            type={participantDetail.type}
            name={participantDetail.name}
            img={participantDetail.avatar || participantDetail?.image}
            username={participantDetail.username || participantDetail?.shortname}
            loading={loadingChat}
          />
          {loadingChat ? (
            <div className={css.main__loading}>
              <span className={css.loader} />
            </div>
          ) : (
            <div className={css.main}>{list.length ? <ChatList list={list} /> : emptyBoxJSX}</div>
          )}
          <div className={css.sendBoxContainer}>
            <SendBox value={sendingValue} onValueChange={setSendingValue} onSend={onSend} disabled={loadingChat} />
          </div>
        </Card>
      </TwoColumnCursor>
      <CreateChatModal
        open={openCreateChatModal}
        onClose={() => setOpenCreateChatModal(false)}
        userList={userList}
        onSearch={onCreateSearch}
        onCreateChat={onCreateChat}
      />
    </div>
  );
};
