import css from './accordion.module.scss';
import { AccordionProps } from './accordion.types';

export const Accordion = ({
  title,
  children,
  id,
  no_border = false,
  inputClassName = '',
  contentClassName = '',
}: AccordionProps): JSX.Element => {
  return (
    <div className={css.tabs}>
      <div className={css.tab}>
        <input className={`${css.input} ${inputClassName}`} type="checkbox" id={id} />
        <label className={`${css.tabLabel} ${no_border && css.tabLabel_noBorder}`} htmlFor={id}>
          {title}
        </label>
        <div className={`${css.tabContent} ${contentClassName}`}>{children}</div>
      </div>
    </div>
  );
};
