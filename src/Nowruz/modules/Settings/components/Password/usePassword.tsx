import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { changePassword } from 'src/core/api';
import { passwordPattern } from 'src/core/regexs';
import * as yup from 'yup';

import { Inputs } from "./password.type";



const schema = yup.object().shape({
    current_password: yup.string().required(),
    password: yup.string().required(),
    confirm: yup.string().required(),
});

export const usePassword = () => {
    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
    const [isPasswordPatternValid, setIsPasswordPatternValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isPasswordMatch, setPasswordMatch] = useState(true);
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });
    const current_password = watch('current_password');
    const password = watch('password');
    const confirmPassword = watch('confirm');
    useEffect(() => {
        setIsFormValid(
            !!password && password.length >= 8 && passwordPattern.test(password) && (password === confirmPassword),
        );
        setIsPasswordLengthValid(!!(password && password.length >= 8));
        setIsPasswordPatternValid(!!(password && passwordPattern.test(password)));
        setPasswordMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {        
        try {
          await changePassword({ current_password, password });
          reset();
          
        } catch (error) { console.log(error); }
      };

    return { register, handleSubmit, errors, onSubmit,reset,isPasswordMatch ,isFormValid ,isPasswordLengthValid,isPasswordPatternValid };
};



