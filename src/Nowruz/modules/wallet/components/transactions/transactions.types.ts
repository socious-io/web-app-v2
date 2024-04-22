import { PaymentsRes, StripeProfileRes } from 'src/core/api';

export interface PaymentDataType {
  profileImage?: string;
  name: string;
  date: string;
  type: string;
  currency: string;
  amount: string;
  userType: 'users' | 'organizations';
  missionId: string;
  transactionId: string;
  mobileAmount: string;
}

export interface Resolver {
  paymentRes: PaymentsRes;
  stripeProfileRes: StripeProfileRes;
  jpStripeProfileRes: StripeProfileRes;
}
