import { config } from 'src/config';
import { getAuthUrlAdaptor } from 'src/core/adaptors';

export const useIntro = () => {
  const onContinue = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + 'oauth/socious');
    if (error) return;
    if (data) window.location.href = data.url;
  };

  return {
    operations: {
      onContinue,
    },
  };
};
