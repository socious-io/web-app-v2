export interface WithdrawMissionsProps {
  mission_name: string;
  escrow: { release_id?: string; released_at?: Date };
  amount: number;
  total: number;
  fee: number;
  onClickWithdraw: () => void;
  service?: 'STRIPE' | 'CRYPTO';
  currency?: string;
  disbaledWithdraw?: boolean;
  disableText?: string;
}
