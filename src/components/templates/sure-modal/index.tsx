import { Button } from 'src/components/atoms/button/button';

import css from './sure-modal.module.scss';
import { SureModalProps } from './sure-modal.types';
import { Modal } from '../modal/modal';

export const SureModal: React.FC<SureModalProps> = ({ open, onClose, modalTexts, onDone }) => {
  return (
    <Modal open={open} onClose={onClose} className={css.modal}>
      <>
        <span className={css.header} style={{ color: modalTexts?.titleColor }}>
          {modalTexts.title}
        </span>
        {modalTexts.body}
        <div className={css.buttons}>
          <Button color="blue" onClick={onDone}>
            {modalTexts.confirmButton}
          </Button>
          <Button color="white" onClick={onClose}>
            {modalTexts.cancleButton}
          </Button>
        </div>
      </>
    </Modal>
  );
};
