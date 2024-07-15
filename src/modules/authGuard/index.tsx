import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { useAuth } from 'src/hooks/use-auth';

import { AuthGuardProps } from './authGuard.types';
import { AuthGuardModal } from './components/authGuardModal';
import { SigninModal } from './components/signinModal';
import { SignupModal } from './components/signupModal';

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, redirectUrl }) => {
  const { isLoggedIn } = useAuth();

  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const location = useLocation();

  const onClick = () => {
    if (!isLoggedIn) {
      setOpen(true);
    }
  };

  const saveCurrentRoute = (): Promise<void> => {
    localStorage.setItem('registerFor', 'user');
    const path = redirectUrl || location.pathname;
    nonPermanentStorage.set({ key: 'openApplyModal', value: 'true' });
    return nonPermanentStorage.set({ key: 'savedLocation', value: path });
  };

  const handleSignin = async () => {
    await saveCurrentRoute();
    setOpen(false);
    setOpenSignin(true);
    setOpenSignup(false);
  };

  const handleSignup = async () => {
    await saveCurrentRoute();
    setOpen(false);
    setOpenSignup(true);
    setOpenSignin(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSignin(false);
    setOpenSignup(false);
  };

  return (
    <>
      {open && (
        <AuthGuardModal open={open} handleSignin={handleSignin} handleSignup={handleSignup} handleClose={handleClose} />
      )}
      {openSignin && <SigninModal open={openSignin} handleClose={handleClose} handleSignup={handleSignup} />}
      {openSignup && <SignupModal open={openSignup} handleClose={handleClose} handleSignin={handleSignin} />}
      <div className="w-full cursor-pointer" onClick={onClick}>
        <div className="w-full" style={{ pointerEvents: isLoggedIn ? undefined : 'none' }}>
          {children}
        </div>
      </div>
    </>
  );
};
