import { Button } from '../../../../components/atoms/button/button';
import { Card } from '../../../../components/atoms/card/card';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  return (
    <div className={css.container}>
      <Card className={css.card} padding="6rem 0 0 0">
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
      </Card>
    </div>
  );
};
