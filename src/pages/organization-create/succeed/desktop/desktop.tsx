import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { useOrganizationCreateShared } from 'src/pages/organization-create/organization-create.shared';

import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const { navigateToVerified, organizationName } = useOrganizationCreateShared();

  return (
    <div className={css.container}>
      <Card className={css.card} padding="6rem 0 0 0">
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
