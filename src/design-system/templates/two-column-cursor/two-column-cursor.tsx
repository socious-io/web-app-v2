import css from './two-column-cursor.module.scss';
import { TwoColumnCursorProps } from './two-column-cursor.types';

export const TwoColumnCursor = (props: TwoColumnCursorProps): JSX.Element => {
  const { children } = props;

  return (
    <div className={css.container}>
      <div className={css.boundaries}>
        <div className={css.sidebar}>{children[0]}</div>
        <div className={css.main}>{children[1]}</div>
      </div>
    </div>
  );
};
