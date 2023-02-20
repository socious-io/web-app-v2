import { Button } from '../../../../components/atoms/button/button';
import { Card } from '../../../../components/atoms/card/card';
import { LIST_ITEM } from '../intro.services';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  return (
    <div className={css.container}>
      <Card padding={0} className={css.card}>
        <div className={css.header}>
          <div className={css.back} onClick={console.log}>
            <img src="/icons/chevron-left-white.svg" />
          </div>
          <div className={css.title}>Add your organization</div>
        </div>
        <div className={css.main}>
          <div className={css.statement}>
            Find talented professionals to help your social cause:
          </div>
          <div className={css.list}>
            {LIST_ITEM.map((item) => (
              <div key={item.icon} className={css.listItem}>
                <div className={css.iconContainer}>
                  <div className={css.icon}>
                    <img src={item.icon} />
                  </div>
                </div>
                <div className={css.content}>{item.content}</div>
              </div>
            ))}
          </div>
          <div className={css.note}>
            * You can post jobs when your company has been successfully verified by our team.
          </div>
        </div>
        <div className={css.bottom}>
          <Button>Continue</Button>
        </div>
      </Card>
    </div>
  );
};
