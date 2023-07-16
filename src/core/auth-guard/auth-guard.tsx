import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { AuthGuardProps } from './auth-guard.types';
import { Modal } from 'src/components/templates/modal/modal';
import { Button } from 'src/components/atoms/button/button';
import css from './auth-guard.module.scss';
import { useNavigate } from '@tanstack/react-location';

export const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
  const { isLoggedIn } = useAuth();
  const [modalVisibility, setModalVisibility] = useState(false);
  const navigate = useNavigate();

  function onClick() {
    if (!isLoggedIn) {
      setModalVisibility(true);
    }
  }

  function navigateToLogin() {
    navigate({ to: '/sign-in' });
  }

  function navigateToSignup() {
    navigate({ to: '/sign-up/user/email' });
  }

  return (
    <>
      <Modal width="25rem" maxWidth="70vw" open={modalVisibility} onClose={() => setModalVisibility(false)}>
        <div className={css.modal}>
          <div className={css.title}>Sign in to Socious</div>
          <div className={css.subTitle}>To continue, please sign in or register</div>
          <div className={css.btnContainer}>
            <Button onClick={navigateToSignup}>Join now</Button>
            <Button onClick={navigateToLogin} color="white">
              Sign in
            </Button>
          </div>
        </div>
      </Modal>
      <div style={{ cursor: 'pointer' }} onClick={onClick}>
        <div style={{ pointerEvents: isLoggedIn ? undefined : 'none' }}>{children}</div>
      </div>
    </>
  );
};
