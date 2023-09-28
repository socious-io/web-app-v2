import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { identities, handleError, updateProfile,UserMeta } from 'src/core/api';
import { useForm,  } from 'src/core/form';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { formModel } from './sign-up-user-complete.form';
import { changePasswordDirect } from './sign-up-user-complete.services';




export const useSignUpUserCompleteShared = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm(formModel);

  async function setProfileName() {
    const currentIdentities = await identities();
    dispatch(setIdentityList(identities));
    
    const meta = currentIdentities.find((identity) => identity.primary)?.meta as UserMeta;


    const payload = {
      username: meta.username,
      first_name: form.controls.firstName.value as  string,
      last_name: form.controls.lastName.value as string,
    };
    updateProfile(payload);
  }

  async function onSubmit() {
    const password = form.controls.password.value as string;
    const path = await nonPermanentStorage.get('savedLocation');

    changePasswordDirect(password)
      .then(setProfileName)
      .then(() => navigate(path ? path : '/sign-up/user/welcome'))
      .catch(handleError());
  }

  function navigateToTermsConditions() {
    navigate('/terms-conditions');
  }

  function navigateToPrivacyPolicy() {
    navigate('/privacy-policy');
  }

  function navigateToSignIn() {
    navigate('/sign-in');
  }

  return {
    form,
    onSubmit,
    navigateToTermsConditions,
    navigateToPrivacyPolicy,
    navigateToSignIn,
  };
};
