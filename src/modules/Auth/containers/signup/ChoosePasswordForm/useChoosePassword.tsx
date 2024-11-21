import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { changePasswordDirect } from 'src/core/api';
import { passwordPattern } from 'src/core/regexs';
import * as yup from 'yup';
type Inputs = {
  password: string;
  confirm: string;
};
const schema = yup.object().shape({
  password: yup.string().required(),
  confirm: yup.string().required(),
});
export const useChoosePassword = () => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
  const [isPasswordPatternValid, setIsPasswordPatternValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const password = watch('password');
  const confirmPassword = watch('confirm');
  useEffect(() => {
    setIsFormValid(
      !!password && password.length >= 8 && passwordPattern.test(password) && password === confirmPassword,
    );
    setIsPasswordLengthValid(!!(password && password.length >= 8));
    setIsPasswordPatternValid(!!(password && passwordPattern.test(password)));
  }, [password, confirmPassword]);
  const onSubmit: SubmitHandler<Inputs> = async ({ password, confirm }) => {
    try {
      changePasswordDirect({ password });
      navigate('../complete');
    } catch (e) {
      console.log(e);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isFormValid,
    isPasswordLengthValid,
    isPasswordPatternValid,
    translate,
  };
};
