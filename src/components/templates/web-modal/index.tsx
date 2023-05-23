import { Button } from 'src/components/atoms/button/button';
import { Modal } from '../modal/modal';
import { WebModalProps } from './web-modal.types';
import { printWhen } from 'src/core/utils';
import css from './web-modal.module.scss';

export const WebModal: React.FC<WebModalProps> = ({
  open,
  onClose,
  children,
  header,
  buttons = [],
  className = '',
  headerClassName = '',
  footerClassName = '',
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={`${css.container} ${className}`}>
        <div className={`${css.header} ${headerClassName}`}>
          <span></span>
          {header}
          <div onClick={onClose} className={css.icon}>
            <img src="/icons/close-black.svg" />
          </div>
        </div>
        {children}
        {printWhen(
          <div className={`${css.bottom} ${footerClassName}`}>
            {buttons?.map((btn, index) => (
              <Button key={index} {...btn} />
            ))}
          </div>,
          !!buttons?.length
        )}
      </div>
    </Modal>
  );
};
