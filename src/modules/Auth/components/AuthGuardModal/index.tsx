import { Backdrop } from '@mui/material';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';

import { AuthGuardModalProps } from './index.types';

const AuthGuardModal: React.FC<AuthGuardModalProps> = ({ open, handleClose, onContinue }) => {
  return (
    <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} open={open} id="auth-guard-modal">
      <div className="w-[25rem] relative flex flex-col mx-4 mb-20 mt-auto md:m-auto p-4 md:p-6 bg-Base-White rounded-xl">
        <div className="flex flex-col gap-3 md:gap-4 items-center justify-center">
          <Button
            variant="text"
            color="primary"
            className="w-11 min-w-11 h-11 absolute right-4 top-4 p-2 cursor-pointer"
            onClick={handleClose}
          >
            <Icon name="x-close" fontSize={24} className="text-Gray-light-mode-500" />
          </Button>
          <img src="/images/logo/logo.svg" width={32} height={32} alt="Socious Logo" />
          <div className="flex flex-col items-center gap-1">
            <h1 className="font-semibold text-lg leading-7 text-Gray-light-mode-900">
              {translate('login-socious-id-button')}
            </h1>
          </div>
        </div>
        <Button variant="contained" color="primary" onClick={onContinue} customStyle="mt-5">
          {translate('login-continue-button')}
        </Button>
      </div>
    </Backdrop>
  );
};

export default AuthGuardModal;
