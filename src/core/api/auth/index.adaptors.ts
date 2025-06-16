import { AdaptorRes } from 'src/core/adaptors';
import { auth, sociousOauth } from 'src/core/api';

import { Auth, AuthRes } from './auth.types';

export const getAuthUrlAdaptor = async (redirect_url: string): Promise<AdaptorRes<Auth>> => {
  try {
    const { auth_url: url } = await auth({ redirect_url });
    return { data: { url }, error: null };
  } catch (error) {
    console.error('Error in fetching Socious ID URL: ', error);
    return { data: null, error: 'Error in fetching Socious ID URL' };
  }
};

export const sociousOauthAdaptor = async (code: string): Promise<AdaptorRes<AuthRes>> => {
  try {
    const data = await sociousOauth({ code });
    console.log('asdf', data);
    return { data, error: null };
  } catch (error) {
    console.error('Error in fetching Socious session: ', error);
    return { data: null, error: 'Error in fetching Socious session' };
  }
};
