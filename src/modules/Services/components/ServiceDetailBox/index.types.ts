import { PaymentMode, CurrencyDetail } from 'src/core/adaptors';

export type ServiceDetail = {
  skills: string[];
  delivery: string;
  price: string;
  currency: CurrencyDetail;
  payment: PaymentMode;
};

export interface ServiceDetailBoxProps {
  serviceDetail: ServiceDetail;
  onPurchase?: () => void;
  customStyle?: string;
}
