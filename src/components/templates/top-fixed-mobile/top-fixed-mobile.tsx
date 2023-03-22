import { TopFixedMobileProps } from './top-fixed-mobile.types';
import css from './top-fixed-mobile.module.scss';
import { CSSProperties } from 'react';

export const TopFixedMobile = (props: TopFixedMobileProps): JSX.Element => {
  const style: CSSProperties = {
    height: props.containsMenu ? 'calc(100vh - var(--menu-height))' : '100vh',
  };

  return (
    <div style={style} className={css.container}>
      <div className={css.top}>{props.children[0]}</div>
      <div className={css.body}>{props.children[1]}</div>
    </div>
  );
};
