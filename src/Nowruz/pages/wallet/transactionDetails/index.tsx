import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import css from './transactionDetails.module.scss';
import { useTransactionDetailes } from './useTransactionDetails';

export const TransactionDetails = () => {
  const { handleBack, detail, isUser, disablePayout, openWithdraw, setOpenWithdraw, accounts, withdrawFund } =
    useTransactionDetailes();

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

  const footerJSX = (
    <div className="w-full flex flex-col p-4 gap-3 md:flex-row-reverse md:p-6">
      <Button variant="contained" color="primary" fullWidth onClick={withdrawFund}>
        Withdraw
      </Button>
      <Button variant="outlined" color="secondary" fullWidth onClick={() => setOpenWithdraw(false)}>
        Cancel
      </Button>
    </div>
  );
  return (
    <>
      <div className="w-full md:w-[580px] flex flex-col py-8 px-4 md:px-8 gap-8">
        <div className={css.header}>Payments</div>
        <BackLink onBack={handleBack} title="Back to transactions history" customStyle="w-fit" />
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Transaction details</span>
            {/* <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">Payment received</span> */}
          </div>
          {isUser && (
            <Button variant="contained" color="primary" disabled={disablePayout} onClick={() => setOpenWithdraw(true)}>
              Withdraw
            </Button>
          )}
        </div>
        <div className="flex flex-col">
          <div className={css.bordered}>
            <div className="flex gap-3">
              <Avatar size="40px" type={detail.avatarType} img={detail.avatar} />
              {renderItems(detail.name, [detail.date])}
            </div>
            <span className=" hidden md:flex text-sm font-medium leading-5 text-Gray-light-mode-900">
              {`${detail.symbol}${detail.amount}`}
            </span>
          </div>
          <div className={`${css.bordered} flex md:!hidden`}>
            <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">{`${detail.symbol}${detail.amount}`}</span>
          </div>
          <div className={css.bordered}>{renderItems('Paid to', [detail.name])}</div>
          <div className={css.bordered}>{renderItems('Transaction ID', [detail.transactionId])}</div>
          <div className={css.bordered}>{renderItems('Contact information', [detail.name, detail.email])}</div>
        </div>
      </div>
      {openWithdraw && (
        <Modal
          open={openWithdraw}
          handleClose={() => setOpenWithdraw(false)}
          icon={<FeaturedIcon type="modern" iconName="credit-card-down" size="lg" theme="gray" />}
          title=""
          mobileFullHeight={false}
          footer={footerJSX}
          headerDivider={false}
          footerDivider={false}
          customStyle="max-w-[480px]"
        >
          <div className="pt-4 px-4 md:px-6 flex flex-col gap-5 ">
            <span className={css.modalTitle}>Withdraw</span>
            <div className="flex flex-col gap-1.5">
              <span className={css.modalRowTitles}>Amount</span>
              <span className={css.modalAmount}>{`${detail.symbol}${detail.amount}`}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className={css.modalRowTitles}>Transfer to</span>
              <div className={css.withdrawAccount}>
                <img src="/icons/bank.svg" alt="" />
                <div className="flex flex-col">
                  <span className={css.modalRowTitles}>{accounts[0].bank_name}</span>
                  <span className={css.modalSubtitles}>{accounts[0].account}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
