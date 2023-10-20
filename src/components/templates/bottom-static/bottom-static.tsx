import { BottomStaticTouch } from './bottom-static-touch/bottom-static-touch';
import css from './bottom-static.module.scss';
import { BottomStaticProps } from './bottom-static.types';
import { isTouchDevice } from '../../../core/device-type-detector';

export const BottomStatic = (props: BottomStaticProps): JSX.Element => {
  const [topContent, bottomContent] = props.children;

  if (!isTouchDevice()) {
    return (
      <BottomStaticTouch>
        <div className={css.top}>{topContent}</div>
        <div>{bottomContent}</div>
      </BottomStaticTouch>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.top}>{topContent}</div>
      <div className={css.bottom}>{bottomContent}</div>
    </div>
  );
};
