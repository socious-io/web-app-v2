import { App, URLOpenListenerEvent } from '@capacitor/app';
import React, { useEffect } from 'react';

export const DeepLinks: React.FC = () => {
  function escapeAmpersands(url: string): string {
    // Replace all '&' characters with '\&'
    return url.replace(/&/g, '\\&');
  }
  useEffect(() => {
    const handleAppUrlOpen = (event: URLOpenListenerEvent) => {
      const slug = event.url.split('.app').pop();
      if (slug) {
        window.location.href = escapeAmpersands(slug);
      }
    };
    App.addListener('appUrlOpen', handleAppUrlOpen);
  }, []);

  return null;
};
