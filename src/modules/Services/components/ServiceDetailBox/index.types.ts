import { CurrencyDetail } from 'src/core/adaptors';
import { PaymentMode } from 'src/core/api';

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
