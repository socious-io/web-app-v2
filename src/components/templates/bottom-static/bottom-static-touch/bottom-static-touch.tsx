import css from './bottom-static-touch.module.scss';
import { BottomStaticTouchProps } from './bottom-static-touch.types';

export const BottomStaticTouch = (props: BottomStaticTouchProps): JSX.Element => {
  const [topContent, bottomContent] = props.children;

  return (
    <div className={css.container}>
      <div className={css.box}>
        <div className={css.top}>{topContent}</div>
        <div className={css.bottom}>{bottomContent}</div>
      </div>
    </div>
  );
};
