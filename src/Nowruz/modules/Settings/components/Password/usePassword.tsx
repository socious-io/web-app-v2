import { passwordPattern } from 'src/core/regexs';
import { changePassword } from 'src/core/api';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Inputs } from "./password.type"

import * as yup from 'yup';


const schema = yup.object().shape({
    current_password: yup.string().required(),
    password: yup.string().required(),
    confirm: yup.string().required(),
});

export const usePassword = () => {
    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
    const [isPasswordPatternValid, setIsPasswordPatternValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isPasswordMatch, setPasswordMatch] = useState(true)
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });
    const current_password = watch('current_password')
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
          await changePassword({ current_password, password })
          reset();
          
        } catch (error) { console.log(error) }
      };

    // const onSubmit: SubmitHandler<Inputs> = async ({ current_password, password }) => {
    //     console.log({ current_password, password });
        
    //     try {
    //         changePassword({ current_password, password });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // function onSubmit() {
    //     const payload = {
    //       "current_password": current_password,
    //       "password": password,
    //     };
    //     changePassword(payload)
    //     .then(() => {debugger})
    //     .catch((err) => {
    //         console.log(err.response.data);
    //     });
    //   }

    return { register, handleSubmit, errors, onSubmit,reset,isPasswordMatch ,isFormValid ,isPasswordLengthValid,isPasswordPatternValid };
}



