import { useMatch, useNavigate } from '@tanstack/react-location';
import { Button } from '../../../atoms/button/button';
import css from './confirm.module.scss';

export const Confirm = () => {
    const navigate = useNavigate();
    const queryParam = useMatch().search;
    const email = queryParam.email;


    const joinNow = () => {
        navigate({ to: '../../intro' })
    }


    return (
        <div className={css.container}>
            <div className={css.logo}>
                <img src="/images/Logo-vertical.png" />
            </div>
            <div className={css.title}>
                <span>Your account has been deleted.</span>
            </div>
            <div className={css.content}>
                <span className={css.text}>You will receive a confirmation</span>
                <div className={css.email}>
                    <span>email at: </span>
                    <span>{email}</span>
                </div>
            </div>
            <div className={css.button}>
                <Button color='blue' onClick={joinNow}>
                    Join now
                </Button>
            </div>
        </div>
    )
}