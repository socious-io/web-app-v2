import { StripeAccount, stripeProfile } from 'src/core/api';

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
