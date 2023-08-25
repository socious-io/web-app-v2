import Card from '@atoms/card';
import { Button } from '@atoms/button/button';
import { printWhen } from 'src/core/utils';
import { BankAccountsProps } from './bank-accounts.types';
import css from './bank-accounts.module.scss';

export const BankAccounts: React.FC<BankAccountsProps> = ({ accounts, bankAccountLink, isDisabled }) => {
  return (
    <Card className={css.container}>
      <span className={css.header}>Bank accounts</span>
      {printWhen(
        accounts?.map((account) => (
          <div className={css.content} key={account.account}>
            <img src="/icons/bank.svg" />
            {account.bank_name} - {account.account}
          </div>
        )),
        !!accounts?.length
      )}
      <Button color="white" disabled={isDisabled} className={css.btn}>
        <a href={bankAccountLink} target='_blank' className={`${css.link} ${isDisabled && css.link__disabled}`}>
          <img src="/icons/add.svg" width={18} height={18} />
          Add a bank account
        </a>
      </Button>
    </Card>
  );
};
