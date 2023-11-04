import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerReq, preRegister, RegisterReq, handleError } from 'src/core/api';
import * as yup from 'yup';
type Inputs = {
  email: string;
};
const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
});
export const useEmailForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    console.log(email);
    const response = await preRegister({ email: email });
    if (response.email === 'EXISTS') {
      handleError({ title: 'error', message: 'Email already in use. Please sign in or choose another email.' })();
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
