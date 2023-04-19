export interface BankAccountsProps {
  accounts: { bank_name: string; account: string }[];
  onClickAddAccount: () => void;
  isDisabled: boolean;
}
