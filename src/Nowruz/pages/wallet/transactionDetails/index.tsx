import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './transactionDetails.module.scss';
import { useTransactionDetailes } from './useTransactionDetails';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';

export const TransactionDetails = () => {
  const { handleBack, detail, isUser, isDisablePayout, openWithdraw, setOpenWithdraw } = useTransactionDetailes();
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
      <Button variant="contained" color="primary" fullWidth>
        Continue
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
            <Button
              variant="outlined"
              color="secondary"
              disabled={isDisablePayout()}
              onClick={() => setOpenWithdraw(true)}
            >
              <Icon name="arrow-down" fontSize={20} className="text-Gray-light-mode-700" />
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
              {detail.amount}
            </span>
          </div>
          <div className={`${css.bordered} flex md:!hidden`}>
            <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">{detail.amount}</span>
          </div>
          <div className={css.bordered}>{renderItems('Paid to', [detail.name])}</div>
          <div className={css.bordered}>{renderItems('Transaction ID', [detail.transactionId])}</div>
          <div className={css.bordered}>{renderItems('Contact information', [detail.name, detail.email])}</div>
        </div>
      </div>
      {openWithdraw && (
        // <AlertModal
        //   open={openWithdraw}
        //   onClose={() => setOpenWithdraw(false)}
        //   onSubmit={handleAlertSubmit}
        //   message={alertMessage}
        //   title='Withdraw funds'
        //   subtitle
        //   customIcon={alertIcon}
        //   closeButtn={true}
        //   closeButtonLabel="Cancel"
        //   submitButton={true}
        //   submitButtonLabel="Confirm"
        // />
        <Modal
          open={openWithdraw}
          handleClose={() => setOpenWithdraw(false)}
          icon={<FeaturedIcon type="modern" iconName="credit-card-down" size="lg" theme="gray" />}
          title=""
          mobileFullHeight={false}
          footer={footerJSX}
          // children,
          headerDivider={false}
          footerDivider={false}
          customStyle={css.withdrawModal}
        >
          <div className="pt-4 px-4 md:px-6">Test</div>
        </Modal>
      )}
    </>
  );
};
