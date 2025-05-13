import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { User, identities, preRegister, updateProfile } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { checkUsernameConditions } from 'src/core/utils';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import * as yup from 'yup';

type Inputs = {
  username: string;
  firstName: string;
  lastName: string;
};
const schema = yup.object().shape({
  username: yup.string().required(i18next.t('sign-up-username-error')),
  firstName: yup.string().required(i18next.t('sign-up-name-error')),
  lastName: yup.string().required(i18next.t('sign-up-last-name-error')),
});
export const useUserDetails = () => {
  const [isUsernameValid, setIsusernameValid] = useState(false);
  const [isUsernameAvailable, setIsusernameAvailable] = useState(false);
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const resolver = useLoaderData() as { currentProfile: User };
  const currentProfile = useRef<User>(resolver.currentProfile);
  const { state } = useLocation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const username = watch('username');
  const firstName = watch('firstName');
  const lastName = watch('lastName');

  const appleUser = state?.socialUser;
  const defaultFirstName = currentProfile?.current.first_name || appleUser?.first_name || '';
  const defaultLastName = currentProfile?.current.last_name || appleUser?.last_name || '';

  useEffect(() => {
    const usernameConditionErrors = checkUsernameConditions(username);
    clearErrors('username');
    setIsusernameValid(false);
    if (usernameConditionErrors) {
      setIsusernameValid(false);
      setError('username', {
        type: 'manual',
        message: usernameConditionErrors,
      });
    } else if (!usernameConditionErrors && username) {
      debouncedCheckUsername(username);
      if (isUsernameAvailable) {
        setIsusernameValid(true);
        clearErrors('username');
      } else {
        setIsusernameValid(false);
        setError('username', {
          type: 'manual',
          message: translate('sign-up-username-not-available'),
        });
      }
    }
  }, [username, isUsernameAvailable]);

  const checkUsernameAvailability = async (username: string) => {
    const checkUsername = await preRegister({ username });
    if (checkUsername.username === null) {
      setIsusernameAvailable(true);
    } else setIsusernameAvailable(false);
  };
  const debouncedCheckUsername = debounce(checkUsernameAvailability, 800);

  const onSubmit: SubmitHandler<Inputs> = async ({ firstName, lastName, username }) => {
    try {
      await updateProfile({ username: username.toLowerCase(), first_name: firstName, last_name: lastName });
      const currentIdentities = await identities();
      dispatch(setIdentityList(currentIdentities));
      navigate('../congrats');
    } catch (error) {
      dialog.alert({ title: 'error', message: String(error) });

      return;
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 && firstName !== '' && lastName !== '' && username !== '' && isUsernameValid;

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isUsernameValid,
    isFormValid,
    currentProfile,
    translate,
    appleUser,
    defaultFirstName,
    defaultLastName,
  };
};
