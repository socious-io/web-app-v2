import { Backdrop } from '@mui/material';
import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { ModalHeader } from '../modalHeader';

interface SigninModalProps {
  open: boolean;
  handleSignin: () => void;
  handleSignup: () => void;
  handleClose: () => void;
}

export const AuthGuardModal: React.FC<SigninModalProps> = ({ open, handleSignin, handleSignup, handleClose }) => {
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} id="auth-guard-modal">
      <div className="max-w-[400px] md:w-[400px] mb-20 mt-auto md:m-auto rounded-xl flex flex-col bg-Base-White z-30 p-4 md:p-6 relative">
        <ModalHeader
          title="Log in to your account"
          subtitle="To continue, please sign in or register"
          handleClose={handleClose}
        />
        <div className="flex flex-col gap-3 pt-5 pb-4 md:pb-6">
          <Button variant="contained" color="primary" onClick={handleSignup}>
            Create an account
          </Button>
          <Button variant="outlined" color="primary" onClick={handleSignin}>
            Login
          </Button>
        </div>
      </div>
    </Backdrop>
  );
};
