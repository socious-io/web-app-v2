import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { Fab } from 'src/components/atoms/fab/fab';
import { ContactItem } from 'src/components/molecules/contact-item/contact-item.types';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { ChatList } from 'src/components/organisms/chat-list/chat-list';
import { ContactList } from 'src/components/organisms/contact-list/contact-list';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { createChat, filterChats, filterFollowings } from 'src/core/api';
import { useAuth } from 'src/hooks/use-auth';
import {
  chatEntityToContactListAdaptor,
  convertFollowingsToContactList,
} from 'src/pages/chat/contact-list/contact-list.services';
import { CreateChatModal } from 'src/pages/chat/contact-list/create-chat-modal';
import css from 'src/pages/chat/message-detail/desktop/desktop.module.scss';
import { Header } from 'src/pages/chat/message-detail/desktop/header';
import { useMessageDetailShared } from 'src/pages/chat/message-detail/message-detail.shared';
import { MessageLoader } from 'src/pages/chat/message-detail/message-detail.types';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const resolver = useLoaderData() as MessageLoader;
  const { isLoggedIn } = useAuth();
  const { summery, followings } = resolver || {};
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
    filterChats(payload).then((resp) => {
      setChats(chatEntityToContactListAdaptor(resp.items));
    });
  }

  function onSearch(value: string) {
    const payload = { page: 1, filter: value };
    filterChats(payload).then((resp) => {
      setChats(chatEntityToContactListAdaptor(resp.items));
      setState(payload);
    });
  }

  function onCreateSearch(value: string) {
    const payload = { page: 1, name: value };
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
    navigate(`/chats/contacts/${createdChats?.id}`);
    updateMessages(createdChats?.id);
    updateChatList();
  }

  const emptyBoxJSX = (
    <div className={css.emptyBoxContainer}>
      <Avatar
        type={participantDetail.type}
        img={participantDetail.identity_meta.avatar || participantDetail.identity_meta.image || ''}
        size="8rem"
      />
      <div className={css.text}>
        Start chatting with
        <span>{participantDetail.identity_meta.name}</span>
      </div>
    </div>
  );

  useEffect(() => {
    const messageBody = document.getElementById('chat-list-div');
    if (messageBody) messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }, [list]);

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
            name={participantDetail.identity_meta.name}
            img={participantDetail.identity_meta.avatar || participantDetail.identity_meta.image || ''}
            username={participantDetail.identity_meta.username || participantDetail.identity_meta.shortname || ''}
            loading={loadingChat}
          />
          {loadingChat ? (
            <div className={css.main__loading}>
              <span className={css.loader} />
            </div>
          ) : (
            <div id="chat-list-div" className={css.main}>
              {list.length ? <ChatList list={list} /> : emptyBoxJSX}
            </div>
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
