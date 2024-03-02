import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { changePassword } from 'src/core/api';
import { passwordPattern } from 'src/core/regexs';
import * as yup from 'yup';

import { Inputs } from "./password.type";


const schema = yup.object().shape({
    current_password: yup.string().required('Current password is required'),
    password: yup.string().required('Password is required').notOneOf([yup.ref('current_password'),null],'cantMach').min(8,'Minimum 8 characters').matches(passwordPattern, 'Password complexity is week'),
    confirm: yup.string().required('Confirm password is required').oneOf([yup.ref('password')], 'Passwords must match')
});
export const usePassword = () => {
    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
    const [isPasswordPatternValid, setIsPasswordPatternValid] = useState(false);

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<Inputs>({
        mode: "all",
        resolver: yupResolver(schema),
    });
    const current_password = watch('current_password');
    const password = watch('password');
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
          await changePassword({ current_password, password });
          reset();
        } catch (error) { console.log(error); }
      };
      useEffect(() => {
        setIsPasswordLengthValid(!!(password && password.length >= 8));
        setIsPasswordPatternValid(!!(password && passwordPattern.test(password)));
      }, [password]);
    return { register, handleSubmit, errors, onSubmit,reset,isFormValid: isValid,isPasswordLengthValid,isPasswordPatternValid };
};