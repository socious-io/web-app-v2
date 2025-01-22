export interface PaymentSummaryProps {
  amount: number;
  sociousFee: number;
  stripeFee: number;
  total: number;
  currency: string;
  hasFeeDiscount: boolean;
}
