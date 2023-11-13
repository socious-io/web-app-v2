import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerReq, preRegister, handleError } from 'src/core/api';
import * as yup from 'yup';
type Inputs = {
  email: string;
};
const schema = yup.object().shape({
  email: yup.string().email('Enter a correct email').required('Email is required'),
});
export const useEmailForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    const response = await preRegister({ email: email });
    clearErrors('email');

    if (response.email === 'EXISTS') {
      setError('email', {
        type: 'manual',
        message: 'Email already in use. Please sign in or choose another email.',
      });
      return;
    } else {
      registerReq({ email })
        .then(() => localStorage.setItem('email', email))
        .then(() => navigate('../verification'))
        .catch(handleError());
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};
