import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { register as registerReq, preRegister, handleError } from 'src/core/api';
import * as yup from 'yup';
type Inputs = {
  email: string;
};
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, i18next.t('sign-up-email-error-correct'))
    .required(i18next.t('sign-up-email-error-required')),
});
export const useEmailForm = () => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const savedReferrer = localStorage.getItem('referrer');
  const referrerUser = savedReferrer ? JSON.parse(savedReferrer) : null;

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    const response = await preRegister({ email: email });
    clearErrors('email');

    if (response.email === 'EXISTS') {
      setError('email', {
        type: 'manual',
        message: translate('sign-up-email-error-duplicate'),
      });
      return;
    } else {
      registerReq({ email }, referrerUser?.id)
        .then(() => localStorage.setItem('email', email))
        .then(() => navigate('../verification'))
        .catch(handleError());

      if (localStorage.getItem('registerFor') === 'user') localStorage.removeItem('referrer');
    }
  };

  return { register, handleSubmit, errors, onSubmit, navigate, translate };
};
