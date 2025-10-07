import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { getAuthUrlAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useIntro = () => {
  const platform = Capacitor.getPlatform();

  const status = useSelector((state: RootState) => state.identity.status);
  const [selectedOnboarding, setSelectedOnboarding] = useState<'user' | 'organization'>('user');
  const navigate = useNavigate();

  useEffect(() => {
    let listener: any;

    const setupListener = async () => {
      listener = await App.addListener('appUrlOpen', async data => {
        const url = data.url;

        if (url.includes('oauth/socious')) {
          await Browser.close();

          const urlObj = new URL(url);
          const path = urlObj.pathname + urlObj.search;

          navigate(path);
        }
      });
    };

    platform !== 'web' && setupListener();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [navigate]);

  const onContinue = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + 'oauth/socious');
    if (error) return;
    if (data) {
      if (platform === 'web') window.location.href = data.url;
      else await Browser.open({ url: data.url });
    }
  };

  return {
    data: {
      status,
      selectedOnboarding,
    },
    operations: {
      setSelectedOnboarding,
      onContinue,
    },
  };
};
