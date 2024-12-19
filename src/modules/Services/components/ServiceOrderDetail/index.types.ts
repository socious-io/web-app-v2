import { Service } from 'src/core/adaptors';

export interface ServiceOrderDetailProps {
  service: Service;
  orderPayment: { total: number; fee: number; feePercentage: number };
  buttonName?: string;
  onButtonClick?: () => void;
}
