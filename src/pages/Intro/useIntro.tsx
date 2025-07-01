import { useState } from 'react';
import { useSelector } from 'react-redux';
import { config } from 'src/config';
import { getAuthUrlAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useIntro = () => {
  const status = useSelector((state: RootState) => state.identity.status);
  const [selectedOnboarding, setSelectedOnboarding] = useState<'user' | 'organization'>('user');

  const onContinue = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + 'oauth/socious');
    if (error) return;
    if (data) window.location.href = data.url;
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
