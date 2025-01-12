import { PaymentCurrency } from 'src/core/api';
import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';
import AddPayoutAccount from 'src/modules/general/containers/AddPayoutAccount';

import { useSliderOfferReceived } from './useSliderOfferReceived';
import SelectBankAccountUser from '../SelectBankAccountUser';
import { WalletModal } from '../walletModal';
import styles from './index.module.scss';
import { SliderOfferReceivedProps } from './index.types';

const SliderOfferReceived: React.FC<SliderOfferReceivedProps> = ({ contract, disableMessage, redirectToChat }) => {
  const {
    data: { disableAcceptBtn, stripeAccounts, displayAlert, openModal },
    operations: { setOpenModal, handleCloseModal, onDeclineOffer, onAcceptOffer, handleAcceptClick },
  } = useSliderOfferReceived(contract);

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['buttons']}>
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            {translate('cont-message')}
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={onDeclineOffer}>
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
            <Button
              variant="text"
              color="warning"
              customStyle="!text-sm !underline !p-0"
              onClick={() => setOpenModal({ name: 'add-card', open: true })}
            >
              {translate('cont-add-account')}
            </Button>
          </AlertMessage>
        )}
      </div>
      {contract.type === 'PAID' && (
        <>
          <AddPayoutAccount
            open={openModal.name === 'add-card' && openModal.open}
            handleClose={handleCloseModal}
            currency={contract.currency.name as PaymentCurrency}
          />
          <SelectBankAccountUser
            open={openModal.name === 'select-card' && openModal.open}
            handleClose={handleCloseModal}
            accounts={stripeAccounts}
            handleAccept={onAcceptOffer}
          />
          <WalletModal
            open={openModal?.name === 'wallet' && openModal?.open}
            handleClose={handleCloseModal}
            handleAccept={onAcceptOffer}
            walletAddress={contract.client?.meta?.wallet_address}
          />
        </>
      )}
    </>
  );
};

export default SliderOfferReceived;
