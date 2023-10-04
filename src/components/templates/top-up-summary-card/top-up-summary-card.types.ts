import { Offer } from 'src/core/types';

export interface TopUpSummaryCardProps {
  title: string;
  unit?: string;
  offer_rate: number;
  weekly_limit: number;
  isPaidCrypto: boolean;
  containerClassName?: string;
  verified_impact?: boolean;
}
