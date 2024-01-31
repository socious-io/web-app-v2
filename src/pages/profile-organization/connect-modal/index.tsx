import { Button } from 'src/components/atoms/button/button';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Modal } from 'src/components/templates/modal/modal';

import css from './connect-modal.module.scss';
import { ConnectModalProps } from './connect-modal.types';

export const ConnectModal: React.FC<ConnectModalProps> = ({ open, onClose, onSend, onMessage }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={css.container}>
        <span className={css.header}>Request to connect</span>
        <span>Add a message to your connection request</span>
        <Textarea variant="outline" placeholder="Write a message" onChange={(e) => onMessage?.(e.target.value)} />
        <div className={css.buttons}>
          <Button color="blue" onClick={onSend}>
            Send
          </Button>
          <Button color="white" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
