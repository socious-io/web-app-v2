import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { config } from 'src/config';
import { getAuthUrlAdaptor } from 'src/core/adaptors';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { useAuth } from 'src/hooks/use-auth';
import AuthGuardModal from 'src/modules/Auth/components/AuthGuardModal';

import { AuthGuardProps } from './index.types';

const AuthGuard: React.FC<AuthGuardProps> = ({ children, redirectUrl }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);

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

  const onContinue = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + 'oauth/socious');
    if (error) return;
    if (data) {
      await saveCurrentRoute();
      window.location.href = data.url;
    }
  };

  return (
    <>
      <AuthGuardModal open={open} handleClose={() => setOpen(false)} onContinue={onContinue} />
      <div className="w-full cursor-pointer" onClick={onClick}>
        <div className="w-full" style={{ pointerEvents: isLoggedIn ? undefined : 'none' }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthGuard;
