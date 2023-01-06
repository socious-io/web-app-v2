import css from './divider.module.scss';
import { DividerProps } from './divider.types';

export const Divider = (props: DividerProps): JSX.Element => {
  const { children, title, ...rest } = props;
  return (
    <div style={rest} className={css.container}>
      {title && <div className={css.title}>{title}</div>}
      {children}
    </div>
  );
};
