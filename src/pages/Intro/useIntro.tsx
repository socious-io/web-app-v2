import { config } from 'src/config';
import { getAuthUrlAdaptor } from 'src/core/api/auth/index.adaptors';

export const useIntro = () => {
  const onContinue = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + 'oauth/socious');
    if (error) return;
    else if (data) window.location.href = data.url;
  };

  return {
    operations: {
      onContinue,
    },
  };
};
