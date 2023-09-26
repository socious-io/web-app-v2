import { App as CapacitorApp, URLOpenListenerEvent } from '@capacitor/app';

import { useEffect } from 'react';

export const DeepLinks = (): JSX.Element => {
  const navigate = {};
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
