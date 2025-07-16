import { auth, AuthRes, sociousOauth, StripeAccount, stripeProfile } from 'src/core/api';

import { AdaptorRes } from '..';

export const getStripAccountsAdaptor = async (): Promise<AdaptorRes<StripeAccount[]>> => {
  try {
    const requests = [stripeProfile({}), stripeProfile({ is_jp: true })];
    const [stripeProfileRes, jpStripeProfileRes] = await Promise.all(requests);
    const stripeAccounts: StripeAccount[] = [
      ...(stripeProfileRes?.external_accounts?.data || []),
      ...(jpStripeProfileRes?.external_accounts?.data || []),
    ];
    return {
      data: stripeAccounts,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting stripe accounts', error);
    return { data: null, error: 'Error in getting stripe accounts' };
  }
};

export const getAuthUrlAdaptor = async (redirect_url: string): Promise<AdaptorRes<{ url: string }>> => {
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
    return { data, error: null };
  } catch (error) {
    console.error('Error in fetching Socious session: ', error);
    return { data: null, error: 'Error in fetching Socious session' };
  }
};
