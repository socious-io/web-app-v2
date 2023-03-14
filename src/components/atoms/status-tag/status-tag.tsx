import { CSSProperties } from 'react';
import css from './status-tag.module.scss';
import { StatusTagProps } from './status-tag.types';

export const StatusTag = (props: StatusTagProps): JSX.Element => {
  const style: Record<StatusTagProps['color'], CSSProperties> = {
    orange: {
      color: 'var(--color-black-01)',
      backgroundColor: 'var(--color-warning-01)',
    },
    green: {
      color: 'white',
      backgroundColor: 'var(--color-success-01)',
    },
    unspecified: {
      backgroundColor: '#ececec',
    },
  };

  return (
    <div style={style[props?.color] || style.unspecified} className={css.container}>
      {props.label}
    </div>
  );
};
