import { Search } from 'src/components/atoms/search/search';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Modal } from 'src/components/templates/modal/modal';

import css from './add-member-modal.module.scss';
import { AddMemberModalProps } from './add-member-modal.types';

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  open,
  onClose,
  memberList,
  acceptedMembers,
  onSearch,
  onAddMember,
}) => {
  return (
    <Modal open={open} onClose={onClose} className={css.modal}>
      <>
        <div className={css.header}>
          <span></span>
          Add members
          <div onClick={onClose} className={css.icon}>
            <img src="/icons/close-black.svg" />
          </div>
        </div>
        <div className={css.container}>
          <div className={css.search}>
            <Search flex="1" placeholder="Search connections" onValueChange={onSearch} />
          </div>
          <div className={css.list}>
            {memberList?.length ? (
              memberList.map((list) => (
                <div className={css.list__member} key={list.id}>
                  <ProfileView {...list} />
                  {!acceptedMembers.find((accepted) => accepted.id === list.id)?.id ? (
                    <div onClick={() => onAddMember(list.id)}>
                      <img src="/icons/user-add.svg" className={css.icon} />
                    </div>
                  ) : (
                    <span className={css.list__added}>Member</span>
                  )}
                </div>
              ))
            ) : (
              <div className={css.notFound}>Following not found!</div>
            )}
          </div>
        </div>
      </>
    </Modal>
  );
};
