import { Button } from 'src/components/atoms/button/button';
import { Steps } from 'src/components/atoms/steps/steps';
import { Textarea } from 'src/components/atoms/textarea/textarea';

import css from './mobile.module.scss';
import { required, useForm } from '../../../../core/form';
import { useOrganizationCreateShared } from '../../organization-create.shared';

export const Mobile = (): JSX.Element => {
  const { onMissionSkip, missionValue, navigateToCulture, updateMission, navigateToProfile } =
    useOrganizationCreateShared();
  const form = useForm({ mission: { initialValue: missionValue, validators: [required()] } });

  form.controls.mission.subscribe(updateMission);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={navigateToProfile}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={6} current={4} />
        </div>
        <div onClick={onMissionSkip} className={css.skip}>
          Skip
        </div>
      </div>
      <div className={css.question}>What's your organization's mission?</div>
      <div className={css.main}>
        <Textarea register={form} name="mission" placeholder="Your organization's mission" />
      </div>
      <div className={css.bottom}>
        <Button disabled={!missionValue} onClick={navigateToCulture}>
          Continue
        </Button>
      </div>
    </div>
  );
};
