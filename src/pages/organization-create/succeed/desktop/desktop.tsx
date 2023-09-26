import css from './desktop.module.scss';
import { Button } from '../../../../components/atoms/button/button';
import { Card } from '../../../../components/atoms/card/card';
import { useOrganizationCreateShared } from '../../organization-create.shared';

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
