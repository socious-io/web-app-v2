import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './transactionDetails.module.scss';
import { useTransactionDetailes } from './useTransactionDetails';

export const TransactionDetails = () => {
  const { handleBack, name, avatar, avatarType, date, amount, transactionId, email, symbol } = useTransactionDetailes();
  const renderItems = (title: string, subtitles: string[]) => {
    return (
      <div className="flex flex-col">
        <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">{title}</span>
        {subtitles.map((item) => (
          <span key={item} className=" text-sm font-normal leading-5 text-Gray-light-mode-600">
            {item}
          </span>
        ))}
      </div>
    );
  };
  return (
    <div className="w-full md:w-[580px] flex flex-col py-8 px-4 md:px-8 gap-8">
      <div className={css.header}>Payments</div>
      <BackLink onBack={handleBack} title="Back to transactions history" customStyle="w-fit" />
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Transaction details</span>
          {/* <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">Payment received</span> */}
        </div>
        <Button variant="contained" color="primary">
          Withdraw
        </Button>
      </div>
      <div className="flex flex-col">
        <div className={css.bordered}>
          <div className="flex gap-3">
            <Avatar size="40px" type={avatarType} img={avatar} />
            {renderItems(name, [date])}
          </div>
          <span className=" hidden md:flex text-sm font-medium leading-5 text-Gray-light-mode-900">{`${symbol}${amount}`}</span>
        </div>
        <div className={`${css.bordered} flex md:!hidden`}>
          <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">{amount}</span>
        </div>
        <div className={css.bordered}>{renderItems('Paid to', [name])}</div>
        <div className={css.bordered}>{renderItems('Transaction ID', [transactionId])}</div>
        <div className={css.bordered}>{renderItems('Contact information', [name, email])}</div>
      </div>
    </div>
  );
};
