import { changePasswordDirect } from './sign-up-user-complete.services';
import { useForm } from '../../../core/form';
import { formModel } from './sign-up-user-complete.form';
import { handleError } from '../../../core/http';
import { getIdentities } from '../../../core/api';
import { updateProfile } from './sign-up-user.complete.services';
import { useDispatch } from 'react-redux';
import { setIdentityList } from '../../../store/reducers/identity.reducer';

import { nonPermanentStorage } from 'src/core/storage/non-permanent';

export const useSignUpUserCompleteShared = () => {
  const navigate = {};
  const dispatch = useDispatch();
  const form = useForm(formModel);

  async function setProfileName() {
    const identities = await getIdentities();
    dispatch(setIdentityList(identities));
    const username = identities.find((identity) => identity.current)?.meta.username;

    const payload = {
      username,
      firstName: form.controls.firstName.value,
      lastName: form.controls.lastName.value,
    };
    updateProfile(payload);
  }

  async function onSubmit() {
    const password = form.controls.password.value as string;
    const path = await nonPermanentStorage.get('savedLocation');

    changePasswordDirect(password)
      .then(setProfileName)
      .then(() => navigate({ to: path ? path : '/sign-up/user/welcome' }))
      .catch(handleError());
  }

  function navigateToTermsConditions() {
    navigate({ to: '/terms-conditions' });
  }

  function navigateToPrivacyPolicy() {
    navigate({ to: '/privacy-policy' });
  }

  function navigateToSignIn() {
    navigate({ to: '/sign-in' });
  }

  return {
    form,
    onSubmit,
    navigateToTermsConditions,
    navigateToPrivacyPolicy,
    navigateToSignIn,
  };
};
