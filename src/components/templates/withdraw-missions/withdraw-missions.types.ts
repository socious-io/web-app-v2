export interface WithdrawMissionsProps {
    mission_name: string;
    amount: number;
    onClickWithdraw: () => void;
    fee?: number;
    unit?: string;
    disbaledWithdraw?: boolean;
}