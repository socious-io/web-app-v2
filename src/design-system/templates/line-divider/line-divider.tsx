import css from './line-divider.module.scss';
import { LineDividerProps } from './line-divider.types';

export const LineDivider = (props: LineDividerProps): JSX.Element => {
  const { children, title, ...rest } = props;
  return (
    <div style={rest} className={css.container}>
      {title && <div className={css.title}>{title}</div>}
      {children}
    </div>
  );
};
