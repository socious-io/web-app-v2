import { PaymentDetailProps } from 'src/components/molecules/payment-detail/payment-detail.types';

export interface TopUpSummaryCardProps {
  //extends PaymentDetailProps {
  title: string;
  unit?: string;
  offer_rate: number;
  weekly_limit: number;
  isPaidCrypto: boolean;
  containerClassName?: string;
  //   total_price: number;
}
