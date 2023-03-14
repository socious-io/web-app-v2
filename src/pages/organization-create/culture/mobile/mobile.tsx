import { useNavigate } from '@tanstack/react-location';
import { useDispatch, useSelector } from 'react-redux';
import { CreateOrgWizard, setCulture } from '../../../../store/reducers/createOrgWizard.reducer';
import { RootState } from '../../../../store/store';
import { Button } from '../../../../components/atoms/button/button';
import { Steps } from '../../../../components/atoms/steps/steps';
import { Textarea } from '../../../../components/atoms/textarea/textarea';
import { addOrganization, wizardFormToPayloadAdaptor } from '../../organization-create';
import css from './mobile.module.scss';
import { required, useForm } from '../../../../core/form';
import { handleError } from '../../../../core/http';
import { getIdentities } from '../../../../core/api';
import { setIdentityList } from '../../../../store/reducers/identity.reducer';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cultureValue = useSelector<RootState, string>((state) => {
    return state.createOrgWizard?.culture || '';
  });

  const formState = useSelector<RootState, CreateOrgWizard>((state) => {
    return state.createOrgWizard;
  });

  const form = useForm({ culture: { initialValue: cultureValue, validators: [required()] } });
  form.controls.culture.subscribe((v) => dispatch(setCulture(v)));

  function navigateToSuccess() {
    navigate({ to: '../succeed' });
  }

  function onSkip() {
    dispatch(setCulture(''));
    submitOrganization(formState);
  }

  async function updateIdentityList() {
    const identities = await getIdentities();
    dispatch(setIdentityList(identities));
  }

  function submitOrganization(wizardForm: CreateOrgWizard) {
    const payload = wizardFormToPayloadAdaptor(wizardForm);
    addOrganization(payload).then(navigateToSuccess).then(updateIdentityList).catch(handleError());
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
        <Textarea name="culture" register={form} placeholder="Your organization's culture" />
      </div>
      <div className={css.bottom}>
        <Button disabled={!cultureValue} onClick={() => submitOrganization(formState)}>
          Continue
        </Button>
      </div>
    </div>
  );
};
