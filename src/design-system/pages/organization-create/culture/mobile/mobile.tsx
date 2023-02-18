import { useNavigate } from '@tanstack/react-location';
import { useDispatch, useSelector } from 'react-redux';
import { CreateOrgWizard, resetCreateOrgWizard, setCulture } from '../../../../../store/reducers/createOrgWizard.reducer';
import { RootState } from '../../../../../store/store';
import { Button } from '../../../../atoms/button/button';
import { Steps } from '../../../../atoms/steps/steps';
import { Textarea } from '../../../../atoms/textarea/textarea';
import { addOrganization, wizardFormToPayloadAdaptor } from '../../organization-create';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cultureValue = useSelector<RootState, string | undefined>((state) => {
    return state.createOrgWizard?.culture;
  });

  const form = useSelector<RootState, CreateOrgWizard>((state) => {
    return state.createOrgWizard;
  });

  function navigateToSuccess() {
    navigate({ to: '../succeed' });
  }

  function onSkip() {
    dispatch(setCulture(''));
    submitOrganization(form);
  }

  function submitOrganization(wizardForm: CreateOrgWizard) {
    const payload = wizardFormToPayloadAdaptor(wizardForm);
    addOrganization(payload)
      .then(navigateToSuccess)
      .then(() => {
        dispatch(resetCreateOrgWizard());
      });
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: '../mission' })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={6} current={5} />
        </div>
        <div onClick={onSkip} className={css.skip}>
          Skip
        </div>
      </div>
      <div className={css.question}>Tell us about your organization's culture.</div>
      <div className={css.main}>
        <Textarea
          value={cultureValue}
          onValueChange={(value) => dispatch(setCulture(value))}
          placeholder="Your organization's culture"
        />
      </div>
      <div className={css.bottom}>
        <Button disabled={!cultureValue} onClick={() => submitOrganization(form)}>
          Continue
        </Button>
      </div>
    </div>
  );
};
