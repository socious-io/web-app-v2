import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import { printWhen } from 'src/core/utils';
import { AlertModalProps } from './alert-modal.types';
import css from './alert-modal.module.scss';

export const AlertModal: React.FC<AlertModalProps> = ({
  open,
  onClose,
  header,
  status,
  title,
  subtitle = '',
  footer = '',
  buttons = [],
}) => {
  return (
    <CardSlideUp open={open} onClose={onClose}>
      <>
        <div className={css.header}>{header}</div>
        <div className={css.container}>
          <Card className={css.content}>
            <img src={`/icons/${status}.svg`} alt={status} />
            <div className={css.title}>{title}</div>
            {printWhen(<div className={css.subtitle}>{subtitle}</div>, !!subtitle)}
            {printWhen(<div className={css.footer}>{footer}</div>, !!footer)}
          </Card>
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
        </div>
      </>
    </CardSlideUp>
  );
};
