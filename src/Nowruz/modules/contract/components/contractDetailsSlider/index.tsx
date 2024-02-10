import React from 'react';
import PaymentCrypto from 'src/Nowruz/modules/contract/components/PaymentCrypto';
import { PaymentFiat } from 'src/Nowruz/modules/contract/components/paymentFiat';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';

import { ContractDetailsSliderProps } from './contractDetailsSlider.types';
import { useContractDetailsSlider } from './useContractDetailsSlider';
import AddCardModalUser from '../addCardModalUser';
import { SelectBankAccountUser } from '../selectBankAccountUser';
import { WalletModal } from '../walletModal';

export const ContractDetailsSlider: React.FC<ContractDetailsSliderProps> = ({ offer, mission }) => {
  const {
    name,
    profileImage,
    type,
    tabs,
    displayMessage,
    message,
    displayPrimaryButton,
    primaryButtonLabel,
    primaryButtonAction,
    displaySecondaryButton,
    secondaryButtonLabel,
    secondaryButtonAction,
    openAlert,
    setOpenAlert,
    handleAlertSubmit,
    alertIcon,
    alertTitle,
    alertMessage,
    openPaymentModal,
    handleClosePaymentModal,
    paymentOffer,
    primaryButtonDisabled,
    openAddCardModal,
    setOpenAddCardModal,
    handleAcceptOffer,
    openSelectCardModal,
    setOpenSelectCardModal,
    stripeAccounts,
    openWalletModal,
    setOpenWalletModal,
  } = useContractDetailsSlider(offer, mission);
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 ">
            <Avatar size="72px" type="organizations" img={profileImage} />
            <div className="flex flex-col">
              <span className="font-semibold text-2xl leading-8 text-Gray-light-mode-900">{offer.project.title}</span>
              <span className="font-normal text-base leading-6 text-Gray-light-mode-600">{name}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outlined" color="secondary" fullWidth>
              Message
            </Button>
            {displaySecondaryButton && (
              <Button variant="outlined" color="secondary" fullWidth onClick={secondaryButtonAction}>
                {secondaryButtonLabel}
              </Button>
            )}
          </div>
          {displayPrimaryButton && (
            <Button variant="contained" color="primary" onClick={primaryButtonAction} disabled={primaryButtonDisabled}>
              {primaryButtonLabel}
            </Button>
          )}
          {displayMessage && message}

          <HorizontalTabs tabs={tabs} leftAligned={false} containerCustomStyle="gap-0" />
        </div>
      </div>
      {openAlert && (
        <AlertModal
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          onSubmit={handleAlertSubmit}
          message={alertMessage}
          title={alertTitle}
          customIcon={alertIcon}
          closeButtn={true}
          closeButtonLabel="Cancel"
          submitButton={true}
          submitButtonLabel="Confirm"
        />
      )}
      {type === 'organizations' && offer.status === 'APPROVED' && offer.payment_mode === 'FIAT' && (
        <PaymentFiat offer={paymentOffer} open={openPaymentModal} handleClose={handleClosePaymentModal} />
      )}
      {type === 'organizations' && offer.status === 'APPROVED' && offer.payment_mode === 'CRYPTO' && (
        <PaymentCrypto offer={paymentOffer} open={openPaymentModal} handleClose={handleClosePaymentModal} />
      )}
      {openAddCardModal && (
        <AddCardModalUser offer={offer} open={openAddCardModal} handleClose={() => setOpenAddCardModal(false)} />
      )}
      {openSelectCardModal && (
        <SelectBankAccountUser
          open={openSelectCardModal}
          handleClose={() => setOpenSelectCardModal(false)}
          accounts={stripeAccounts}
          handleAccept={handleAcceptOffer}
        />
      )}
      {openWalletModal && (
        <WalletModal
          open={openWalletModal}
          handleClose={() => setOpenWalletModal(false)}
          handleAccept={handleAcceptOffer}
          walletAddress={offer.recipient?.meta.wallet_address}
        />
      )}
    </>
  );
};
