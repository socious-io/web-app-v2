import { PaymentsRes, StripeProfileRes } from 'src/core/api';

export interface Resolver {
  paymentRes: PaymentsRes;
  stripeProfileRes: StripeProfileRes;
  jpStripeProfileRes: StripeProfileRes;
}
