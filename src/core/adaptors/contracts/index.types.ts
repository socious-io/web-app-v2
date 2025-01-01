export type ContractStatus =
  | 'CREATED'
  | 'CLIENT_APPROVED'
  | 'SIGNED'
  | 'PROVIDER_CANCELED'
  | 'CLIENT_CANCELED'
  | 'APPLIED'
  | 'COMPLETED';

export interface Contract {
  status: ContractStatus;
  orderId: string;
  date: string;
}
