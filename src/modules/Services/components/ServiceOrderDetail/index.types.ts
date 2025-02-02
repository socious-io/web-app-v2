import { SemanticContractStatus, Service } from 'src/core/adaptors';

export type OrderStatus = {
  status: SemanticContractStatus;
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
