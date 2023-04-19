import { Card } from 'src/components/atoms/card/card';
import { Button } from 'src/components/atoms/button/button';
import { printWhen } from 'src/core/utils';
import { BankAccountsProps } from './bank-accounts.types';
import css from './bank-accounts.module.scss';

export const BankAccounts: React.FC<BankAccountsProps> = ({ accounts, onClickAddAccount, isDisabled }) => {
  return (
    <Card className={css.container}>
      <span className={css.header}>Bank accounts</span>
      {printWhen(
        accounts.map((account) => (
          <div className={css.content} key={account.account}>
            <img src="/icons/bank.svg" />
            {account.bank_name} - {account.account}
          </div>
        )),
        !!accounts?.length
      )}
      {printWhen(
        <Button color="white" className={css.btn} onClick={onClickAddAccount}>
          <img src="/icons/add.svg" width={18} height={18} />
          Add a bank account
        </Button>,
        !isDisabled
      )}
    </Card>
  );
};
