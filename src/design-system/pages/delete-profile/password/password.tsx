import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';
import css from './password.module.scss';

export const Password = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const backToPerviousPage = () => {
        navigate({ to: '../delete' });
    }

    const navigateToEmail = () => {
        navigate({ to: '../email' });
    }

    const cancel = () => {

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
                    <span className={css.title}>Delete account </span>
                    <span className={css.text}>Please enter your password to delete your account. </span>
                </div>
                <div className={css.input}>
                    <Input variant='outline' placeholder='Enter password' label='Enter password' value={password} onValueChange={(state) => setPassword(state)} />
                </div>
            </div>
            <div className={css.footer}>
                <Button color='red' onClick={navigateToEmail}>
                    Delete my accoount
                </Button>
                <Button color='white' onClick={cancel}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}