import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { identities, preRegister, updateProfile, UserMeta } from 'src/core/api';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    if (username) {
      debouncedCheckUsername(username);
    } else clearErrors('username');
  }, [username]);

  const checkUsernameAvailability = async (username: string) => {
    const checkUsername = await preRegister({ username });
    if (checkUsername.username === null) {
      console.log(checkUsername);
      setIsusernameValid(true);
      clearErrors('username');
    } else {
      setIsusernameValid(false);
      setError('username', {
        type: 'manual',
        message: 'Username is not available',
      });
    }
  };
  const debouncedCheckUsername = debounce(checkUsernameAvailability, 800);

  const onSubmit: SubmitHandler<Inputs> = async ({ firstName, lastName, username }) => {
    try {
      updateProfile({ username, first_name: firstName, last_name: lastName });
      const currentIdentities = await identities();
      
      dispatch(setIdentityList(currentIdentities));
      navigate('../congrats');
    } catch (error) {
      console.log(error);
    }
  };
  const isFormValid =
    Object.keys(errors).length === 0 && firstName !== '' && lastName !== '' && username !== '' && isUsernameValid;
  return { onSubmit, register, handleSubmit, errors, isUsernameValid, isFormValid };
};
