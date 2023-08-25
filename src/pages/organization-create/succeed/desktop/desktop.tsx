import { Button } from '@atoms/button/button';
import Card from '@atoms/card';
import { useOrganizationCreateShared } from '../../organization-create.shared';
import css from './desktop.module.scss';
import clsx from 'clsx';

export const Desktop = (): JSX.Element => {
  const { navigateToVerified, organizationName } = useOrganizationCreateShared();

  return (
    <div className={css.container}>
      <Card className={clsx(css.card, "pt6")}>
        <div className={css.imgContainer}>
          <div className={css.img}></div>
        </div>
        <div className={css.statement}>
          <div className={css.primary}>Organization created</div>
          <div className={css.secondary}>You have successfully created a page for {organizationName}!</div>
        </div>
        <div className={css.bottom}>
          <Button onClick={navigateToVerified}>Continue</Button>
        </div>
      </Card>
    </div>
  );
};
