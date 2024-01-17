import { Backdrop } from '@mui/material';
import { Logo } from 'public/icons/nowruz/logo';
import React, { SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { useAuth } from 'src/hooks/use-auth';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { AuthGuardProps } from './authGuard.types';

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, redirectUrl }) => {
  const { isLoggedIn } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function onClick() {
    if (!isLoggedIn) {
      setOpenModal(true);
    }
  }

  function saveCurrentRoute(): Promise<void> {
    localStorage.setItem('registerFor', 'user');
    const path = redirectUrl || location.pathname;
    nonPermanentStorage.set({ key: 'openApplyModal', value: 'true' });
    return nonPermanentStorage.set({ key: 'savedLocation', value: path });
  }

  async function navigateToLogin() {
    await saveCurrentRoute();
    navigate('/sign-in');
  }

  //   async function navigateToSignup() {
  //     await saveCurrentRoute();
  //     navigate('/sign-up/user/email');
  //   }

  return (
    <>
      {/* {openModal && (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openModal}>
          <div className="max-w-[400px] md:w-[400px] mb-20 mt-auto md:m-auto rounded-xl flex flex-col bg-Base-White z-30">
            <div className="pt-5 px-4 md:pt-6 md:px-6 gap-3 md:gap-4 flex flex-col items-center">
              <Logo width={32} height={32} />
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-lg leading-7 text-Gray-light-mode-900">Log in to your account</h1>
                <h2 className="font-normal text-sm leading-5 text-Gray-light-mode-600">
                  To continue, please sign in or register
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-3 px-4 pt-5 pb-4 md:px-6 md:pb-6">
              <Button variant="contained" color="primary">
                Create an account
              </Button>
              <Button variant="outlined" color="primary" onClick={navigateToLogin}>
                Login
              </Button>
            </div>
          </div>
        </Backdrop>
      )} */}
      <div className="w-full cursor-pointer" onClick={onClick}>
        <div className="w-full" style={{ pointerEvents: isLoggedIn ? undefined : 'none' }}>
          {children}
        </div>
      </div>
    </>
  );
};
