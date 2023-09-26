import { Search } from 'src/components/atoms/search/search';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Modal } from 'src/components/templates/modal/modal';

import css from './create-chat-modal.module.scss';
import { CreateChatModalProps } from './create-chat-modal.types';

export const CreateChatModal: React.FC<CreateChatModalProps> = ({
  open,
  onClose,
  onSearch,
  userList,
  onCreateChat,
}) => {
  return (
    <Modal open={open} onClose={onClose} className={css.modal}>
      <>
        <div className={css.header}>
          <span></span>
          Create Chat
          <div onClick={onClose} className={css.icon}>
            <img src="/icons/close-black.svg" />
          </div>
        </div>
        <div className={css.container}>
          <div className={css.search}>
            <Search flex="1" placeholder="search name" onValueChange={onSearch} />
          </div>
          <div>
            <div className={css.title}>Connections</div>
            <div className={css.list}>
              {userList?.length ? (
                userList.map((list) => (
                  <div key={list.id} className={css.list__user} onClick={() => onCreateChat(list.id)}>
                    <ProfileView {...list} />
                  </div>
                ))
              ) : (
                <div className={css.notFound}>User not found!</div>
              )}
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};
