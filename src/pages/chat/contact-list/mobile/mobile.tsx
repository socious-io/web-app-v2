import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { Avatar } from '@atoms/avatar/avatar';
import { Fab } from '@atoms/fab/fab';
import { Header } from '@atoms/header/header';
import { CreateChatModal } from '../create-chat-modal';
import { ContactList } from '@organisms/contact-list/contact-list';
import { HeaderStaticMobile } from '@templates/header-static-mobile/header-static-mobile';
import { useContactListShared } from '../contact-list.shared';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    chats,
    onScroll,
    onSearch,
    openCreateChatModal,
    setOpenCreateChatModal,
    onCreateSearch,
    userList,
    onCreateChat,
  } = useContactListShared();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  return (
    <>
      <HeaderStaticMobile>
        <Header
          onBack={() => navigate({ to: '/jobs' })}
          border="0"
          height="auto"
          title="Chats"
          right={<Avatar size="2rem" type="users" img={identity.meta.image} />}
        />
        <ContactList
          height="calc(var(--window-height) - var(--safe-area) + 1.5rem)"
          onScroll={onScroll}
          onContactClick={(contact) => navigate({ to: contact.id })}
          list={chats}
          onSearch={onSearch}
        />
      </HeaderStaticMobile>
      <Fab onClick={() => setOpenCreateChatModal(true)} />
      <CreateChatModal
        open={openCreateChatModal}
        onClose={() => setOpenCreateChatModal(false)}
        userList={userList}
        onSearch={onCreateSearch}
        onCreateChat={onCreateChat}
      />
    </>
  );
};
