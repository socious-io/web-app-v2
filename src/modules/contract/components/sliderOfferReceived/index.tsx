import React from 'react';
import { Contract } from 'src/core/api';
import { translate } from 'src/core/utils';
import { AlertMessage } from 'src/modules/general/components/alertMessage';
import { Button } from 'src/modules/general/components/Button';

import { useSliderOfferReceived } from './useSliderOfferReceived';
import AddCardModalUser from '../addCardModalUser';
import { SelectBankAccountUser } from '../selectBankAccountUser';
import { WalletModal } from '../walletModal';

interface SliderOfferReceivedProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}

export const SliderOfferReceived: React.FC<SliderOfferReceivedProps> = ({
  contract,
  disableMessage,
  redirectToChat,
}) => {
  const {
    handleDecline,
    handleAcceptOffer,
    disableAcceptBtn,
    stripeAccounts,
    handleAcceptClick,
    displayAlert,
    openModal,
    setOpenModal,
  } = useSliderOfferReceived(contract);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            {translate('cont-message')}
          </Button>

          <Button variant="outlined" color="secondary" fullWidth onClick={handleDecline}>
            {translate('cont-decline')}
          </Button>
        </div>
        <Button variant="contained" color="primary" onClick={handleAcceptClick} disabled={disableAcceptBtn}>
          {translate('cont-accept')}
        </Button>
        {displayAlert && (
          <AlertMessage
            theme="warning"
            iconName="alert-circle"
            title={translate('cont-bank-account-alert')}
            subtitle={translate('cont-bank-account-alert-subtitle')}
          >
            <button
              className="cursor-pointer border-none underline text-sm leading-5 font-semibold text-Warning-700"
              onClick={() => setOpenModal({ name: 'addCard', open: true })} //setOpenAddCardModal(true)}
            >
              {translate('cont-add-account')}
            </button>
          </AlertMessage>
        )}
      </div>

      {openModal?.name === 'addCard' && openModal.open && (
        <AddCardModalUser
          offer={contract}
          open={openModal?.name === 'addCard' && openModal.open}
          handleClose={() => setOpenModal({ name: 'addCard', open: false })}
        />
      )}
      {openModal?.name === 'selectCard' && openModal.open && (
        <SelectBankAccountUser
          open={openModal?.name === 'selectCard' && openModal.open}
          handleClose={() => setOpenModal({ name: 'selectCard', open: false })}
          accounts={stripeAccounts}
          handleAccept={handleAcceptOffer}
        />
      )}
      {openModal?.name === 'wallet' && openModal?.open && (
        <WalletModal
          open={openModal?.name === 'wallet' && openModal?.open}
          handleClose={() => setOpenModal({ name: 'wallet', open: false })}
          handleAccept={handleAcceptOffer}
          walletAddress={contract.recipient?.meta.wallet_address}
        />
      )}
    </>
  );
};
