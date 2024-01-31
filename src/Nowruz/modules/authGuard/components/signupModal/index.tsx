import { Backdrop, Typography } from '@mui/material';
import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './signupModal.module.scss';
import { SignUpForm } from '../../containers/signup';
import { ModalHeader } from '../modalHeader';

interface SigninModalProps {
  open: boolean;
  handleClose: () => void;
  handleSignin: () => void;
}

export const SignupModal: React.FC<SigninModalProps> = ({ open, handleClose, handleSignin }) => {
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <div className="max-w-[400px] md:w-[400px] mb-20 mt-auto md:m-auto rounded-xl flex flex-col bg-Base-White z-30 p-4 md:p-6 relative">
        <ModalHeader title="Create a talent account" subtitle="Start making an impact now." handleClose={handleClose} />
        <SignUpForm />
        <div className="my-5 text-center">
          <Typography variant="caption" className="text-Gray-light-mode-600">
            Already have an account?
          </Typography>
          <Button variant="text" color="primary" customStyle={css.signupBtn} onClick={handleSignin}>
            Sign in
          </Button>
        </div>
      </div>
    </Backdrop>
  );
};
