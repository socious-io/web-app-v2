import { App, URLOpenListenerEvent } from '@capacitor/app';
import React, { useEffect } from 'react';

export const DeepLinks: React.FC = () => {
  useEffect(() => {
    const handleAppUrlOpen = (event: URLOpenListenerEvent) => {
      const slug = event.url.split('.app').pop();
      if (slug) {
        window.location.href = slug;
      }
    };
    App.addListener('appUrlOpen', handleAppUrlOpen);
  }, []);

  return null;
};
