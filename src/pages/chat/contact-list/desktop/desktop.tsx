import { useNavigate } from '@tanstack/react-location';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Fab } from 'src/components/atoms/fab/fab';
import { ContactList } from 'src/components/organisms/contact-list/contact-list';
import { Card } from 'src/components/atoms/card/card';
import { CreateChatModal } from '../create-chat-modal';
import { useContactListShared } from '../contact-list.shared';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
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

  return (
    <>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={css.leftContainer}>
          <Card className={css.card}>
            <div className={css.card__header}>Chats</div>
            <ContactList
              height="calc(var(--window-height) - 2.5rem)"
              onScroll={onScroll}
              onContactClick={(contact) => navigate({ to: contact.id })}
              list={chats}
              onSearch={onSearch}
            />
            <Fab onClick={() => setOpenCreateChatModal(true)} className={css.card__fab} />
          </Card>
        </div>
        <Card className={css.rightContainer}>
          <div className={css.message}>
            Message your friends
            <span className={css.message__subheader}>
              Let’s make a great conversation with your trustworthy friends, partners
            </span>
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
    </>
  );
};
