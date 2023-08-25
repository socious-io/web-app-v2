import { Button } from '@atoms/button/button';
import Card from '@atoms/card';
import { Steps } from '@atoms/steps/steps';
import { Textarea } from '@atoms/textarea/textarea';
import css from './desktop.module.scss';
import { required, useForm } from '../../../../core/form';
import { useOrganizationCreateShared } from '../../organization-create.shared';
import clsx from 'clsx';

export const Desktop = (): JSX.Element => {
  const { cultureValue, updateCulture, navigateToMission, onCultureSkip, submitForm } = useOrganizationCreateShared();

  const form = useForm({ culture: { initialValue: cultureValue, validators: [required()] } });
  form.controls.culture.subscribe(updateCulture);

  return (
    <div className={css.container}>
      <Card className={clsx(css.card, "p0")}>
        <div className={css.header}>
          <div className={css.chevron} onClick={navigateToMission}>
            <img height={24} src="/icons/chevron-left.svg" />
          </div>
          <div className={css.stepsContainer}>
            <Steps clickable={false} length={6} current={5} />
          </div>
          <div onClick={onCultureSkip} className={css.skip}>
            Skip
          </div>
        </div>
        <div className={css.question}>Tell us about your organization's culture.</div>
        <div className={css.main}>
          <Textarea name="culture" register={form} placeholder="Your organization's culture" />
        </div>
        <div className={css.bottom}>
          <Button disabled={!cultureValue} onClick={submitForm}>
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};
