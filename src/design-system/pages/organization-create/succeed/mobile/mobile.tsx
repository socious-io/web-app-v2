import { Button } from '../../../../atoms/button/button';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.imgContainer}>
        <div className={css.img}></div>
      </div>
      <div className={css.statement}>
        <div className={css.primary}>Organization created</div>
        <div className={css.secondary}>You have successfully created a page for Green Peace!</div>
      </div>
      <div className={css.bottom}>
        <Button>Continue</Button>
      </div>
    </div>
  );
};
