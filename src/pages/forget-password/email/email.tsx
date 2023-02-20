
import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { Button } from '../../../components/atoms/button/button';
import { Input } from '../../../components/atoms/input/input';
import { forgetPassword } from '../forget-password.service';
import css from './email.module.scss';

export const Email = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const navigateToOtp = () => {
        forgetPassword(email).then((resp) => {
            if (resp.message === 'success') {
                navigate({ to: `../otp?email=${email}` });
            }
        })
    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <img src="/icons/chevron-left.svg" alt="" />
            </div>
            <div className={css.main}>
                <div className={css.forgetPass}>
                    <div className={css.title}>Forget your password</div>
                    <div className={css.input}>
                        <Input variant='outline' placeholder='Email' label='Email' value={email} onValueChange={(state) => setEmail(state)} />
                    </div>
                </div>
            </div>
            <div className={css.footer}>
                <Button color='blue' onClick={navigateToOtp} disabled={!email}>
                    Get a verification code
                </Button>
            </div>
        </div>
    )
}