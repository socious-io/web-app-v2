
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';
import css from './password.module.scss';
import { PasswordQuality } from '../../../atoms/password-quality/password-quality';

const validator = [
    {
        name: 'characters',
        amount: 7
    },
    {
        name: 'number',
        amount: 1
    },
]

export const Password = () => {
    const navigate = useNavigate();

    const changePassword = () => {
        // navigate({ to: '../otp' });
    }

    const backToPerviousPage = () => {
        navigate({ to: '../otp' });
    }
    //     name: 'characters' | 'number';
    //     amount: number;
    //   };

    return (
        <div className={css.container}>
            <div className={css.header}>
                <div onClick={backToPerviousPage}>
                    <img src="/icons/chevron-left.svg" />
                </div>
            </div>
            <div className={css.main}>
                <span className={css.title}>Reset your password </span>
                <div className={css.newPassword}>
                    <Input variant='outline' placeholder='New password' label='New password' />
                    <Input variant='outline' placeholder='Confirm new password' label='Confirm new password' />
                    <PasswordQuality value='Saaraa@123' validators={validator} />
                </div>
            </div>
            <div className={css.footer}>
                <Button color='blue' onClick={changePassword}>
                    Change your password
                </Button>
            </div>
        </div>
    )
}