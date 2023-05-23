import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { Modal } from 'src/components/templates/modal/modal';
import { printWhen } from 'src/core/utils';
import { AlertModalProps } from './alert-modal.types';
import css from './alert-modal.module.scss';

export const AlertModal: React.FC<AlertModalProps> = ({
  open,
  onClose,
  title,
  status = '',
  header = '',
  subtitle = '',
  footer = '',
  buttons = [],
  contentClassName = '',
}) => {
  return (
    <Modal open={open} onClose={onClose} className={css.modal}>
      <>
        <div className={`${header ? css.header : css.no__header}`}>
          <span></span>
          {header}
          <div onClick={onClose}>
            <img src="/icons/close-black.svg" />
          </div>
        </div>
        <div className={css.container}>
          <Card className={`${css.content} ${contentClassName}`}>
            {printWhen(<img src={`/icons/${status}.svg`} alt={status} />, !!status)}
            <div className={css.title}>{title}</div>
            {printWhen(<div className={css.subtitle}>{subtitle}</div>, !!subtitle)}
            {printWhen(<div className={css.footer}>{footer}</div>, !!footer)}
          </Card>
        </div>
        {printWhen(
          <div className={css.btns}>
            {buttons.map((btn, index) => (
              <Button key={index} {...btn}>
                {btn.children}
              </Button>
            ))}
          </div>,
          !!buttons?.length
        )}
      </>
    </Modal>
  );
};
