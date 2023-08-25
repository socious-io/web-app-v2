import css from './desktop.module.scss';
import { Button } from '@atoms/button/button';
import Card from '@atoms/card';
import { Steps } from '@atoms/steps/steps';
import { TypeSelector } from '@atoms/type-selector/type-selector';
import { ORGANIZATION_TYPE } from '@constants/ORGANIZATION_TYPE';
import { useOrganizationCreateShared } from '../../organization-create.shared';
import clsx from 'clsx';

export const Desktop = (): JSX.Element => {
  const { type, updateOrgType, navigateToSocialCauses, navigateToIntro } = useOrganizationCreateShared();

  return (
    <div className={css.container}>
      <Card className={clsx(css.card, "p0")}>
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
        <div className={css.buttonContainer}>
          <Button disabled={!type} onClick={navigateToSocialCauses}>
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};
