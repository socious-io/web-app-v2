import css from './accordion.module.scss';
import { AccordionProps } from './accordion.types';

export const Accordion = ({ title, children , id }: AccordionProps) => {
    return (
        <div className={css.tabs}>
            <div className={css.tab}>
                <input type="checkbox" id={id} />
                <label className={css.tabLabel} htmlFor={id}>
                    {title}
                </label>
                <div className={css.tabContent}>{children}</div>
            </div>
        </div>
    );
};