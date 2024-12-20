import { StatusKeys } from 'src/constants/CONTRACTS_STATUS';
import { Service } from 'src/core/adaptors';

export type OrderStatus = {
  status: StatusKeys;
  orderId: string;
  date: string;
};

export interface ServiceOrderDetailProps {
  service: Service;
  orderPayment: { total: number; fee: number; feePercentage: number };
  orderStatus?: OrderStatus | null;
  buttonName?: string;
  disabledButton?: boolean;
  onButtonClick?: () => void;
}
