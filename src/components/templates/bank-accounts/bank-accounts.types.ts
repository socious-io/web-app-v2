export interface BankAccountsProps {
  accounts: { bank_name: string; account: string }[];
  bankAccountLink: string;
  isDisabled: boolean;
}
