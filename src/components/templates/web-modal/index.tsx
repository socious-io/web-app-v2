import { Button } from 'src/components/atoms/button/button';
import { printWhen } from 'src/core/utils';

import css from './web-modal.module.scss';
import { WebModalProps } from './web-modal.types';
import { Modal } from '../modal/modal';

export const WebModal: React.FC<WebModalProps> = ({
  open,
  onClose,
  children,
  header,
  buttons = [],
  onBack,
  className = '',
  headerClassName = '',
  footerClassName = '',
  zIndex,
}) => {
  return (
    <Modal open={open} onClose={onClose} zIndex={zIndex}>
      <div className={`${css.container} ${className}`}>
        <div className={`${css.header} ${headerClassName}`}>
          <div onClick={onBack} className={css.icon}>
            {printWhen(<img src="/icons/chevron-left.svg" />, !!onBack)}
          </div>
          {header}
          <div onClick={onClose} className={css.icon}>
            <img src="/icons/close-black.svg" />
          </div>
        </div>
        {children}
        {printWhen(
          <div className={`${css.bottom} ${footerClassName}`}>
            {buttons?.map((btn, index) => <Button key={index} {...btn} />)}
          </div>,
          !!buttons?.length,
        )}
      </div>
    </Modal>
  );
};
