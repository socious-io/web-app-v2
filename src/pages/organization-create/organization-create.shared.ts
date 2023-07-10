import { useNavigate } from '@tanstack/react-location';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CreateOrgWizard,
  resetCreateOrgWizard,
  setOrgType,
  setSocialCauses,
} from 'src/store/reducers/createOrgWizard.reducer';
import { RootState } from 'src/store/store';
import { formModel } from './profile/profile.form';
import { useForm } from 'src/core/form';
import { updateForm } from './profile/profile.services';

export const useOrganizationCreateShared = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function navigateToJobs() {
    navigate({ to: '/jobs' });
    // dispatch(resetCreateOrgWizard());
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

  function updateOrgType(value: string) {
    dispatch(setOrgType(value));
  }

  function updateSocialCauses(value: string[]) {
    dispatch(setSocialCauses(value));
  }

  const type = useSelector<RootState, string>((state) => {
    return state.createOrgWizard.type;
  });

  const socialCauses = useSelector<RootState, string[]>((state) => {
    return state.createOrgWizard.socialCauses;
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
    navigateToMission,
  };
};
