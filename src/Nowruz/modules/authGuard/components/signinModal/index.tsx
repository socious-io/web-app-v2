import { Backdrop, Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './signinModal.module.scss';
import { SignInForm } from '../../containers/signin';
import { ModalHeader } from '../modalHeader';

interface SigninModalProps {
  open: boolean;
  handleClose: () => void;
  handleSignup: () => void;
}

export const SigninModal: React.FC<SigninModalProps> = ({ open, handleClose, handleSignup }) => {
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <div className="max-w-[400px] md:w-[400px] mb-20 mt-auto md:m-auto rounded-xl flex flex-col bg-Base-White z-30 p-4 md:p-6 relative">
        <ModalHeader
          title="Log in to your account"
          subtitle="Welcome back! Please enter your details."
          handleClose={handleClose}
        />
        <SignInForm />
        <div className="flex flex-row items-center justify-center gap-1">
          <Typography variant="caption" color={variables.color_grey_600}>
            Don't have an account?
          </Typography>
          <Button variant="text" color="primary" customStyle={css.signupBtn} onClick={handleSignup}>
            Sign up
          </Button>
        </div>
      </div>
    </Backdrop>
  );
};
