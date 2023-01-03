import css from './typography.module.scss';
import { CSSProperties } from 'react';
import { TypeList, TypographyProps } from './typography.types';

export const Typography = (props: TypographyProps): JSX.Element => {
  const { size = 'm', type = 'body', lineLimit, ...rest } = props;

  const sizeList: Record<string, CSSProperties> = {
    s: { fontSize: 'var(--font-size-s)' },
    s2: { fontSize: 'var(--font-size-s2)' }, // TODO: refactor all the sizing
    m: { fontSize: 'var(--font-size-m)' },
    l: { fontSize: 'var(--font-size-l)' },
    xl: { fontSize: 'var(--font-size-xl)' },
  };

  const typeList: TypeList = {
    heading: { fontFamily: 'Hahmlet', fontWeight: 600 },
    body: { fontFamily: 'Work Sans' },
  };

  const styles: CSSProperties = {
    ...sizeList[size],
    ...typeList[type],
    ...rest,
    lineClamp: lineLimit !== undefined ? lineLimit : 'none',
    WebkitLineClamp: lineLimit !== undefined ? lineLimit : 'none',
  };

  const classNames = `${css.container} ${lineLimit !== undefined && css.etc}`;

  return (
    <p style={styles} className={classNames}>
      {props.children}
    </p>
  );
};
