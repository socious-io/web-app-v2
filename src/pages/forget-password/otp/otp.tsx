import { useMatch, useNavigate } from '@tanstack/react-location';
import { Button } from '../../../components/atoms/button/button';
import css from './otp.module.scss';
import { Otp as OtpCom } from '../../../components/atoms/otp/otp';
import { useState } from 'react';
import { confirm } from '../forget-password.service';

export const Otp = () => {
    const navigate = useNavigate();
    const queryParam = useMatch().search;
    const email = queryParam.email;



    const [state, setState] = useState({
        otpValue: '',
        isOtpCompleted: false,
    })

    const navigateToPassword = () => {
        confirm(email, state.otpValue).then((resp) => {
            if (resp.message === 'success') {
                navigate({ to: '../password' });
            }
        })
    }

    const backToPerviousPage = () => {
        navigate({ to: '../email' });
    }

    const changeOtpHabdler = (value: string) => {
        if (value.length === 6) {
            setState({ otpValue: value, isOtpCompleted: true });
        }
    }


    return (
        <div className={css.container}>
            <div className={css.header}>
                <div onClick={backToPerviousPage}>
                    <img src="/icons/chevron-left.svg" />
                </div>
            </div>
            <div className={css.main}>
                <div className={css.content}>
                    <span className={css.title}>Making sure it's you </span>
                    <span className={css.text}>a message with a verfication code has been send to your email. Enter the code to continue.</span>
                </div>
                <div className={css.otp}>
                    <OtpCom length={6} onChange={changeOtpHabdler} />
                </div>
            </div>
            <div className={css.footer}>
                <Button color='blue' onClick={navigateToPassword} disabled={!state.isOtpCompleted}>
                    Verify
                </Button>
            </div>
        </div>
    );
};