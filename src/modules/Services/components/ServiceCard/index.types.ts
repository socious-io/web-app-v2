import { CurrencyDetail } from 'src/core/adaptors';
import { PaymentMode } from 'src/core/api';

export interface ServiceCardProps {
  id: string;
  avatarUrl?: string;
  subtitle?: string;
  sample?: string;
  name?: string;
  category?: string;
  skills: string[];
  delivery: string;
  payment: PaymentMode;
  price?: string;
  currency: CurrencyDetail;
  myProfile: boolean;
  onCardClick: (serviceId: string) => void;
  hasAvatar?: boolean;
  onActions?: (actionName: 'duplicate' | 'delete' | 'edit', serviceId: string) => void;
}
