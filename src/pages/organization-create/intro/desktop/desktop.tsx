import { Button } from '@atoms/button/button';
import Card from '@atoms/card';
import { useOrganizationCreateShared } from '../../organization-create.shared';
import { LIST_ITEM } from '../intro.services';
import css from './desktop.module.scss';
import clsx from 'clsx';

export const Desktop = (): JSX.Element => {
  const { navigateToJobs, navigateToType } = useOrganizationCreateShared();

  return (
    <div className={css.container}>
      <Card className={clsx(css.card, "p0")}>
        <div className={css.header}>
          <div className={css.back} onClick={navigateToJobs}>
            <img src="/icons/chevron-left-white.svg" />
          </div>
          <div className={css.title}>Add your organization</div>
        </div>
        <div className={css.main}>
          <div className={css.statement}>Find talented professionals to help your social cause:</div>
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
          <Button onClick={navigateToType}>Continue</Button>
        </div>
      </Card>
    </div>
  );
};
