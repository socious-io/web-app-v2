import { ORGANIZATION_TYPE } from '../../../../constants/ORGANIZATION_TYPE';
import { Button } from '../../../../components/atoms/button/button';
import { Steps } from '../../../../components/atoms/steps/steps';
import { TypeSelector } from '../../../../components/atoms/type-selector/type-selector';
import css from './mobile.module.scss';
import { useOrganizationCreateShared } from '../../organization-create.shared';

export const Mobile = (): JSX.Element => {
  const { type, updateOrgType, navigateToSocialCauses, navigateToIntro } = useOrganizationCreateShared();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={navigateToIntro}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={6} current={1} />
        </div>
      </div>
      <div className={css.question}>What type of organization?</div>
      <div className={css.main}>
        <TypeSelector value={type} padding="2rem 1rem" onChange={updateOrgType} list={ORGANIZATION_TYPE} />
      </div>
      <div className={css.bottom}>
        <Button disabled={!type} onClick={navigateToSocialCauses}>
          Continue
        </Button>
      </div>
    </div>
  );
};
