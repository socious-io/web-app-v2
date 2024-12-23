import { PaymentMode } from 'src/core/adaptors';

export type ServiceDetail = {
  skills: string[];
  delivery: string;
  price: string;
  currency: { name: string; symbol: string };
  payment: PaymentMode;
};

export interface ServiceDetailBoxProps {
  serviceDetail: ServiceDetail;
  onPurchase?: () => void;
  customStyle?: string;
}
