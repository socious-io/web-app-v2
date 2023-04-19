import { useNavigate } from '@tanstack/react-location';
import { formModel } from './sign-in.form';
import { setAuthCookies } from './sign-in.services';
import { LoginResp } from 'src/core/types';
import { getIdentities } from 'src/core/api';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import store from 'src/store/store';
import { endpoint } from 'src/core/endpoints';
import { handleError } from 'src/core/http';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { LoginPayload } from './sign-in.types';
import { useForm } from 'src/core/form';

export const useSignInShared = () => {
  const navigate = useNavigate();
  const form = useForm(formModel);

  async function onLoginSucceed(loginResp: LoginResp) {
    await setAuthCookies(loginResp);
    const resp = await getIdentities();
    store.dispatch(setIdentityList(resp));
    navigate({ to: '/jobs', replace: true });
  }

  async function onLogin() {
    const formValues = getFormValues(form) as LoginPayload;
    endpoint.post.auth
      .login(formValues)
      .then(onLoginSucceed)
      .catch(handleError({ title: 'Login Failed' }));
  }

  return { onLogin, form, navigate };
};
