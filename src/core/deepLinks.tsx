import { App, URLOpenListenerEvent } from '@capacitor/app';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const DeepLinks: React.FC = () => {
  const navigate = useNavigate();
  function escapeAmpersands(url: string): string {
    return url.replace(/&/g, '\\&');
  }
  useEffect(() => {
    const handleAppUrlOpen = (event: URLOpenListenerEvent) => {
      const slug = event.url.split('.app').pop();
      if (slug) {
        if (slug.includes('oauth/google')) {
          const urlParams = new URLSearchParams(new URL(slug).search);
          // when the user logs in with google, the url has multipe query params and deeplink gets confused
          const authCode = urlParams.get('code');
          if (authCode) {
            navigate(`/oauth/google?code=${authCode}`);
            return;
          }
        }
        const url = new URL(event.url);
        const path = url.pathname;
        navigate(escapeAmpersands(path));
      }
    };
    App.addListener('appUrlOpen', handleAppUrlOpen);
  }, []);

  return null;
};
