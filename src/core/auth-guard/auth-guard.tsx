import { SyntheticEvent, useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { Modal } from 'src/components/templates/modal/modal';

import css from './auth-guard.module.scss';
import { AuthGuardProps } from './auth-guard.types';
import { useAuth } from '../../hooks/use-auth';
import { nonPermanentStorage } from '../storage/non-permanent';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
  const { isLoggedIn } = useAuth();
  const [modalVisibility, setModalVisibility] = useState(false);
  const navigate = useNavigate();
  const route = useLocation();

  function onClick() {
    if (!isLoggedIn) {
      setModalVisibility(true);
    }
  }

  function saveCurrentRoute(): Promise<void> {
    const path = route.current.href;
    return nonPermanentStorage.set({ key: 'savedLocation', value: path });
  }

  async function navigateToLogin() {
    await saveCurrentRoute();
    navigate('/sign-in');
  }

  async function navigateToSignup() {
    await saveCurrentRoute();
    navigate('/sign-up/user/email');
  }

  return (
    <>
      <Modal width="25rem" maxWidth="80vw" open={modalVisibility} onClose={() => setModalVisibility(false)}>
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
