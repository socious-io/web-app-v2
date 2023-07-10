import { Button } from 'src/components/atoms/button/button';
import { Modal } from '../modal/modal';
import { SureModalProps } from './sure-modal.types';
import css from './sure-modal.module.scss';

export const SureModal: React.FC<SureModalProps> = ({ open, onClose, body, onDone }) => {
  return (
    <Modal open={open} onClose={onClose} className={css.modal}>
      <>
        <span className={css.header}>Are you sure?</span>
        {body}
        <div className={css.buttons}>
          <Button color="blue" onClick={onDone}>
            Yes, I’m sure
          </Button>
          <Button color="white" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </>
    </Modal>
  );
};
