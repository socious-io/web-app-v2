import React from 'react';
import { Contract } from 'src/core/api';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Button } from 'src/Nowruz/modules/general/components/Button';

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
            Message
          </Button>

          <Button variant="outlined" color="secondary" fullWidth onClick={handleDecline}>
            Decline
          </Button>
        </div>
        <Button variant="contained" color="primary" onClick={handleAcceptClick} disabled={disableAcceptBtn}>
          Accept
        </Button>
        {displayAlert && (
          <AlertMessage
            theme="warning"
            iconName="alert-circle"
            title="Bank account required"
            subtitle="To accept this offer you need add a payout account"
          >
            <button
              className="cursor-pointer border-none underline text-sm leading-5 font-semibold text-Warning-700"
              onClick={() => setOpenModal({ name: 'addCard', open: true })} //setOpenAddCardModal(true)}
            >
              Add a payout account
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
