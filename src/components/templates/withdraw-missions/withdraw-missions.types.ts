export interface WithdrawMissionsProps {
  mission_name: string;
  escrow: { mission_id: string; amount: number; release_id: string; released_at: string };
  onClickWithdraw: () => void;
  fee?: number;
  unit?: string;
  disbaledWithdraw?: boolean;
  disableText?: string;
}
