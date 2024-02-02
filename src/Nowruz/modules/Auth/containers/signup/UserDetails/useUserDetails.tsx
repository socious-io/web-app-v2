import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
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
  username: yup.string().required('username is required'),
  firstName: yup.string().required('first name is required'),
  lastName: yup.string().required('last name is required'),
});
export const useUserDetails = () => {
  const [isUsernameValid, setIsusernameValid] = useState(false);
  const [isUsernameAvailable, setIsusernameAvailable] = useState(false);
  const dispatch = useDispatch();
  const resolver = useLoaderData() as { currentProfile: User };
  const currentProfile = useRef<User>(resolver.currentProfile);

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
          message: 'Username is not available',
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
      dialog.alert({title: 'error', message: error.message});
      return;
    }
  };
  
  const isFormValid =
    Object.keys(errors).length === 0 && firstName !== '' && lastName !== '' && username !== '' && isUsernameValid;
  return { onSubmit, register, handleSubmit, errors, isUsernameValid, isFormValid, currentProfile };
};
