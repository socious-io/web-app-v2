import css from './confirm.module.scss';
import { Button } from '../../../components/atoms/button/button';
import { useLocation, useNavigate } from 'react-router-dom';

export const Confirm = () => {
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search);
  const email = queryParam.get('email');

  const joinNow = () => {
    navigate('/sign-up/user/email');
  };

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
        <Button color="blue" onClick={joinNow}>
          Join now
        </Button>
      </div>
    </div>
  );
};
