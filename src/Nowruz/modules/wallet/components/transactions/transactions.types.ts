export interface PaymentDataType {
  id: string;
  profileImage?: string;
  name: string;
  date: string;
  type: string;
  currency: string;
  amount: string;
  userType: 'users' | 'organizations';
}
