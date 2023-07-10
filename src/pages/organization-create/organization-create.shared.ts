import { useNavigate } from '@tanstack/react-location';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CreateOrgWizard,
  resetCreateOrgWizard,
  setCulture,
  setMission,
  setOrgType,
  setSocialCauses,
} from 'src/store/reducers/createOrgWizard.reducer';
import { RootState } from 'src/store/store';
import { formModel } from './profile/profile.form';
import { useForm } from 'src/core/form';
import { updateForm } from './profile/profile.services';
import { addOrganization, wizardFormToPayloadAdaptor } from './organization-create';
import { getIdentities } from 'src/core/api';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { handleError } from 'src/core/http';

export const useOrganizationCreateShared = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function updateIdentityList() {
    const identities = await getIdentities();
    dispatch(setIdentityList(identities));
  }

  function submitOrganization(wizardForm: CreateOrgWizard) {
    const payload = wizardFormToPayloadAdaptor(wizardForm);
    addOrganization(payload).then(navigateToSuccess).then(updateIdentityList).catch(handleError());
  }

  function submitForm() {
    submitOrganization(formState);
    dispatch(resetCreateOrgWizard());
  }

  function navigateToJobs() {
    navigate({ to: '/jobs' });
    dispatch(resetCreateOrgWizard());
  }

  function navigateToType() {
    console.log('navigateToType');
    navigate({ to: '../type' });
  }

  function navigateToIntro() {
    navigate({ to: '../intro' });
  }

  function navigateToSocialCauses() {
    navigate({ to: '../social-causes' });
  }

  function navigateToProfile() {
    navigate({ to: '../profile' });
  }

  function navigateToMission() {
    navigate({ to: '../mission' });
  }

  function navigateToCulture() {
    navigate({ to: '../culture' });
  }

  function navigateToSuccess() {
    navigate({ to: '../succeed' });
  }

  function onMissionSkip() {
    dispatch(setMission(''));
    navigateToCulture();
  }

  function onCultureSkip() {
    dispatch(setCulture(''));
    submitOrganization(formState);
  }

  function updateOrgType(value: string) {
    dispatch(setOrgType(value));
  }

  function updateSocialCauses(value: string[]) {
    dispatch(setSocialCauses(value));
  }

  function updateMission(value) {
    dispatch(setMission(value));
  }

  function updateCulture(value) {
    dispatch(setCulture(value));
  }

  const type = useSelector<RootState, string>((state) => {
    return state.createOrgWizard.type;
  });

  const socialCauses = useSelector<RootState, string[]>((state) => {
    return state.createOrgWizard.socialCauses;
  });

  const missionValue = useSelector<RootState, string | undefined>((state) => {
    return state.createOrgWizard.mission;
  });

  const cultureValue = useSelector<RootState, string>((state) => {
    return state.createOrgWizard?.culture || '';
  });

  const formState = useSelector<RootState, CreateOrgWizard>((state) => state.createOrgWizard);

  const memoizedFormState = useMemo(() => formModel(formState), []);
  const isSocialCausesValid = socialCauses.length > 0 && socialCauses.length <= 5;
  const profileForm = useForm(memoizedFormState);
  const updateField = updateForm(dispatch);

  return {
    navigateToJobs,
    navigateToType,
    type,
    navigateToIntro,
    updateOrgType,
    navigateToSocialCauses,
    updateSocialCauses,
    socialCauses,
    isSocialCausesValid,
    formState,
    navigateToProfile,
    profileForm,
    updateField,
    missionValue,
    navigateToMission,
    navigateToCulture,
    onMissionSkip,
    updateMission,
    cultureValue,
    navigateToSuccess,
    onCultureSkip,
    updateCulture,
    submitForm,
  };
};
