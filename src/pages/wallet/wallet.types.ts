import { MissionsRes, StripeProfileRes } from 'src/core/api';

export type Resolver = {
  missionsList: MissionsRes;
  stripeProfileRes: StripeProfileRes;
  jpStripeProfileRes: StripeProfileRes;
};
