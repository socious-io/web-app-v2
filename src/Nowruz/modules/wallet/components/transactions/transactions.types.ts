export interface PaymentDataType {
  profileImage?: string;
  name: string;
  date: string;
  type: string;
  currency: string;
  amount: string;
  userType: 'users' | 'organizations';
  missionId: string;
  transactionId: string;
}
