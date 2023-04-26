import { App as CapacitorApp, URLOpenListenerEvent } from '@capacitor/app';
import { useNavigate } from '@tanstack/react-location';
import { useEffect } from 'react';

export const DeepLinks = (): JSX.Element => {
  const navigate = useNavigate();
  const proofspace = 'zakaio://platform.proofspace.id/native/execute';

  useEffect(() => {
    CapacitorApp.addListener('appUrlOpen', (e: URLOpenListenerEvent) => {
      if (e.url.includes(proofspace)) {
        navigate({ to: '/achievements' });
      }
    });
  }, []);

  return <></>;
};
