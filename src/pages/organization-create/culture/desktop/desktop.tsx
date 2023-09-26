import css from './desktop.module.scss';
import { Button } from '../../../../components/atoms/button/button';
import { Card } from '../../../../components/atoms/card/card';
import { Steps } from '../../../../components/atoms/steps/steps';
import { Textarea } from '../../../../components/atoms/textarea/textarea';
import { required, useForm } from '../../../../core/form';
import { useOrganizationCreateShared } from '../../organization-create.shared';

export const Desktop = (): JSX.Element => {
  const { cultureValue, updateCulture, navigateToMission, onCultureSkip, submitForm } = useOrganizationCreateShared();

  const form = useForm({ culture: { initialValue: cultureValue, validators: [required()] } });
  form.controls.culture.subscribe(updateCulture);

  return (
    <div className={css.container}>
      <Card padding="0" className={css.card}>
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
