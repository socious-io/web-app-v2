import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../atoms/button/button';
import css from './otp.module.scss';
import { Otp as OtpCom } from '../../../atoms/otp/otp';

export const Otp = () => {
    const navigate = useNavigate();

    const navigateToPassword = () => {
        navigate({ to: '../password' });
    }

    const backToPerviousPage = () => {
        navigate({ to: '../email' });
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
                    <OtpCom length={6} />
                </div>
            </div>
            <div className={css.footer}>
                <Button color='blue' onClick={navigateToPassword}>
                    Verify
                </Button>
            </div>
        </div>
    );
};