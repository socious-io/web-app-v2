import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrganization, identities, OrganizationType, SocialCauses } from 'src/core/api';
import { useForm } from 'src/core/form';
import { handleError } from 'src/core/http';
import { RootState } from 'src/store';
import {
  CreateOrgWizard,
  resetCreateOrgWizard,
  setCulture,
  setMission,
  setOrgType,
  setSocialCauses,
} from 'src/store/reducers/createOrgWizard.reducer';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { wizardFormToPayloadAdaptor } from './organization-create';
import { formModel } from './profile/profile.form';
import { updateForm } from './profile/profile.services';

export const useOrganizationCreateShared = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function updateIdentityList() {
    dispatch(setIdentityList(await identities()));
  }

  function submitOrganization(wizardForm: CreateOrgWizard) {
    const payload = wizardFormToPayloadAdaptor(wizardForm);
    createOrganization(payload).then(navigateToSuccess).then(updateIdentityList).catch(handleError());
    // addOrganization(payload).then(navigateToSuccess).then(updateIdentityList).catch(handleError());
  }

  function submitForm() {
    submitOrganization(formState);
    dispatch(resetCreateOrgWizard());
  }

  function navigateToJobs() {
    navigate('/jobs');
    dispatch(resetCreateOrgWizard());
  }

  function navigateToType() {
    navigate('../type');
  }

  function navigateToIntro() {
    navigate('../intro');
  }

  function navigateToSocialCauses() {
    navigate('../social-causes');
  }

  function navigateToProfile() {
    navigate('../profile');
  }

  function navigateToMission() {
    navigate('../mission');
  }

  function navigateToCulture() {
    navigate('../culture');
  }

  function navigateToSuccess() {
    navigate('../succeed');
  }

  function navigateToVerified() {
    navigate('../verified');
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

  const type = useSelector<RootState, OrganizationType | undefined>((state) => {
    return state.createOrgWizard.type;
  });

  const socialCauses = useSelector<RootState, SocialCauses[]>((state) => {
    return state.createOrgWizard.socialCauses;
  });

  const missionValue = useSelector<RootState, string | undefined>((state) => {
    return state.createOrgWizard.mission;
  });

  const cultureValue = useSelector<RootState, string>((state) => {
    return state.createOrgWizard?.culture || '';
  });

  const organizationName = useSelector<RootState, string>((state) => {
    return state.createOrgWizard.organizationName;
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
    navigateToVerified,
    organizationName,
  };
};
