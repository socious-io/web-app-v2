import { printWhen } from 'src/core/utils';
import css from './two-column-cursor.module.scss';
import { TwoColumnCursorProps } from './two-column-cursor.types';
import { CSSProperties } from 'react';

export const TwoColumnCursor = (props: TwoColumnCursorProps): JSX.Element => {
  const { children, ...rest } = props;

  const mainStyle: CSSProperties = {
    maxWidth: props.visibleSidebar ? '38.5rem' : undefined,
  };

  return (
    <div className={css.container} style={rest}>
      <div className={css.boundaries}>
        {printWhen(<div className={css.sidebar}>{children[0]}</div>, props.visibleSidebar)}
        <div style={mainStyle} className={css.main}>
          {children[1]}
        </div>
      </div>
    </div>
  );
};
