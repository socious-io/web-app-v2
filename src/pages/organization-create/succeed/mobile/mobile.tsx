import { Button } from '@atoms/button/button';
import css from './mobile.module.scss';
import { useOrganizationCreateShared } from '../../organization-create.shared';

export const Mobile = (): JSX.Element => {
  const { navigateToVerified, organizationName } = useOrganizationCreateShared();

  return (
    <div className={css.container}>
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
    </div>
  );
};
