import css from './accordion.module.scss';
import { AccordionProps } from './accordion.types';

export const Accordion = ({ title, children, id }: AccordionProps): JSX.Element => {
  return (
    <div className={css.tabs}>
      <div className={css.tab}>
        <input className={css.input} type="checkbox" id={id} />
        <label className={css.tabLabel} htmlFor={id}>
          {title}
        </label>
        <div className={css.tabContent}>{children}</div>
      </div>
    </div>
  );
};
