import css from './mobile.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../../components/atoms/button/button';
import { Steps } from '../../../../components/atoms/steps/steps';
import { Textarea } from '../../../../components/atoms/textarea/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { setMission } from '../../../../store/reducers/createOrgWizard.reducer';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const missionValue = useSelector<RootState, string>((state) => {
    return state.createOrgWizard.mission;
  });

  function navigateToCulture() {
    navigate({ to: '../culture' });
  }

  function onSkip() {
    dispatch(setMission(''));
    navigateToCulture();
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: '../profile' })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={6} current={4} />
        </div>
        <div onClick={onSkip} className={css.skip}>
          Skip
        </div>
      </div>
      <div className={css.question}>What's your organization's mission?</div>
      <div className={css.main}>
        <Textarea
          defaultValue={missionValue}
          onValueChange={(value) => {
            dispatch(setMission(value));
          }}
          placeholder="Your organization's mission"
        />
      </div>
      <div className={css.bottom}>
        <Button disabled={!missionValue} onClick={navigateToCulture}>
          Continue
        </Button>
      </div>
    </div>
  );
};
