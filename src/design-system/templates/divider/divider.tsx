import css from './divider.module.scss';
import { DividerProps } from './divider.types';

export const Divider = (props: DividerProps): JSX.Element => {
  const { children, divider = 'line', title, ...rest } = props;

  const className = divider === 'line' ? css.line : css.space;

  return (
    <div style={rest} className={`${css.container} ${className}`}>
      {title && <div className={css.title}>{title}</div>}
      {children}
    </div>
  );
};
