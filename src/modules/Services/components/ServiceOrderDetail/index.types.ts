import { Service } from 'src/core/adaptors';
import { NewContractStatus } from 'src/core/api';

export type OrderStatus = {
  status: NewContractStatus;
  orderId: string;
  date: string;
};

export interface ServiceOrderDetailProps {
  service: Service;
  orderPayment: { total: number; fee: number; feePercentage: number };
  orderStatus?: OrderStatus | null;
  buttonName?: string;
  disabledButton?: boolean;
  loadingButton?: boolean;
  onButtonClick?: () => void;
}
