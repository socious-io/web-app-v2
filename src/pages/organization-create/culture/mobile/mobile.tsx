import { Button } from 'src/components/atoms/button/button';
import { Steps } from 'src/components/atoms/steps/steps';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { required, useForm } from 'src/core/form';
import { useOrganizationCreateShared } from 'src/pages/organization-create/organization-create.shared';

import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const { cultureValue, updateCulture, navigateToMission, onCultureSkip, submitForm } = useOrganizationCreateShared();

  const form = useForm({ culture: { initialValue: cultureValue, validators: [required()] } });
  form.controls.culture.subscribe(updateCulture);

  return (
    <div className={css.container}>
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
    </div>
  );
};
