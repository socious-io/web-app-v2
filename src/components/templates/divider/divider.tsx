import css from './divider.module.scss';
import { DividerProps } from './divider.types';

export const Divider = (props: DividerProps): JSX.Element => {
  const { children, divider = 'line', title, onEdit, ...rest } = props;

  const className = divider === 'line' ? css.line : css.space;

  return (
    <div style={rest} className={`${css.container} ${className}`}>
      {title && (
        <div className={css.title}>
          {title}
          {onEdit && (
            <div onClick={onEdit} className={css.icon}>
              <img src="/icons/pen.svg" />
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
