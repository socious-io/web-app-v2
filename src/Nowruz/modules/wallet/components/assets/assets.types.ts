import { MissionsRes, StripeProfileRes } from 'src/core/api';

export interface Resolver {
  missionsList: MissionsRes;
  stripeProfileRes: StripeProfileRes;
  jpStripeProfileRes: StripeProfileRes;
}
