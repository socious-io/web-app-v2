import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IdentityReq } from '../../../core/types';
import { RootState } from '../../../store/store';
import { Button } from '../../../components/atoms/button/button';
import { Input } from '../../../components/atoms/input/input';
import { deleteAccount, login } from '../delete-profile.service';
import css from './password.module.scss';

export const Password = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const identity = useSelector<RootState, IdentityReq>((state) => {
        return state.identity.entities.find((identity) => identity.current) as IdentityReq;
    });
    const email = identity.meta.email;


    const backToPerviousPage = () => {
        navigate({ to: '../delete' });
    }

    const deleteMyAccount = () => {
        login(email, password).then(resp => {
            if (resp.message === 'success') {
                deleteAccount(' ').then(resp => {
                    if (resp.message === 'success') {
                        navigate({ to: `../confirm?email=${email}` });
                    }
                });
            }
        });

    }

    const cancel = () => {
        navigate({ to: '../../jobs' });
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
                <Button color='red' onClick={deleteMyAccount}>
                    Delete my accoount
                </Button>
                <Button color='white' onClick={cancel}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}