import { Button } from 'src/components/atoms/button/button';
import { Modal } from 'src/components/templates/modal/modal';
import { UnfollowModalProps } from './unfollow-modal.types';
import css from './unfollow-modal.module.scss';

export const UnfollowModal: React.FC<UnfollowModalProps> = ({ open, onClose, selectedUserName, onUnfollow }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={css.container}>
        Unfollow
        <span className={css.title}>You are about to unfollow {selectedUserName}</span>
        <div className={css.buttons}>
          <Button onClick={onUnfollow}>Unfollow</Button>
          <Button color="white" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
