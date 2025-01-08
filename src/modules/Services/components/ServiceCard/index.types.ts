import { CurrencyDetail, PaymentMode } from 'src/core/adaptors';

export interface ServiceCardProps {
  id: string;
  sample?: string;
  name: string;
  category: string;
  skills: string[];
  delivery: string;
  payment: PaymentMode;
  price: string;
  currency: CurrencyDetail;
  myProfile: boolean;
  onCardClick: (serviceId: string) => void;
  onActions: (actionName: 'duplicate' | 'delete' | 'edit', serviceId: string) => void;
}
