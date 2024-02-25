import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { changePassword } from 'src/core/api';
import * as yup from 'yup';
import { passwordPattern } from 'src/core/regexs';

import { Inputs } from "./password.type";

const schema = yup.object().shape({
    current_password: yup.string().required('Current password is required'),
    password: yup.string().required('Password is required').min(8,'Minimum 8 characters').matches(passwordPattern, 'Password complexity is week'),
    confirm: yup.string().required('Confirm password is required').oneOf([yup.ref('password')], 'Passwords must match')
});

export const usePassword = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
        mode: "all",
        resolver: yupResolver(schema),
    });
    const current_password = watch('current_password');
    const password = watch('password');
    const confirm = watch('confirm');
    useEffect(() => {
      schema
        .validate({current_password, password, confirm}, { abortEarly: false })
        .then((responseData) => {
          setIsFormValid(true);
      })
        .catch((err) => {
          setIsFormValid(false);
      });
    }, [password, confirm, current_password]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
          await changePassword({ current_password, password });
          reset();

        } catch (error) { console.log(error); }
      };
    return { register, handleSubmit, errors, onSubmit,reset,isFormValid };
};