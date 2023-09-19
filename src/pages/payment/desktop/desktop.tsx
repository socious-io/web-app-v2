import { useState } from 'react';
import Dapp from 'src/dapp';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { JobDescrioptionCard } from 'src/components/templates/job-description-card';
import { PaymentSummaryCard } from 'src/components/templates/payment-summary-card';
import { PaymentMethods } from 'src/components/templates/payment-methods';
import { Button } from 'src/components/atoms/button/button';
import { BackLink } from 'src/components/molecules/back-link';
import { AddCardModal } from '../credit-card/add-card-modal';
import { printWhen } from 'src/core/utils';
import { useAuth } from 'src/hooks/use-auth';
import { usePaymentShared } from '../payment.shared';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const {
    offer,
    assignment_total,
    unit,
    checkList,
    total_price,
    start_date,
    cards,
    setCardsList,
    selectedCard,
    onSelectCard,
    onRemoveCard,
    isPaidCrypto,
    onClickProceedPayment,
    isDisabledProceedPayment,
    status,
  } = usePaymentShared();
  const { job_category, recipient, project, total_hours } = offer || {};
  const { avatar, city, country, name: applicant_name, username: applicant_username } = recipient?.meta || {};
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const { isLoggedIn } = useAuth();

  const offeredMessageBoxJSX = (
    <div className={css.offeredMessageBoxJSX}>
      <img src="/icons/info.svg" />
      <div>
        <div className={css.congratulationsText}>Payment required</div>
        <div className={css.congratulationsText}>
          {applicant_name} has accepted your offer. Proceed to payment to start this mission.
        </div>
      </div>
    </div>
  );

  const acceptedMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/tick-white-simple.svg" />
      <div>
        <div className={css.congratulationsText}>Payment was done successfully</div>
      </div>
    </div>
  );

  return (
    <>
      <div className={css.status}>
        {printWhen(offeredMessageBoxJSX, status === 'APPROVED')}
        {printWhen(acceptedMessageBoxJSX, status === 'HIRED')}
      </div>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={`${css.container} ${css.right}`}>
          <BackLink title="Return" onBack={() => history.back()} />
          <JobDescrioptionCard
            job_title={job_category?.name || ''}
            start_date={start_date}
            end_date="Present"
            info_list={[
              { icon: 'suitcase', name: project?.payment_scheme || '' },
              { icon: 'hourglass', name: `${total_hours} hrs` },
            ]}
            img={(avatar as string) || ''}
            type={recipient?.type || 'users'}
            name={applicant_name}
            username={applicant_username}
            location={`${city}, ${country}`}
            total_mission={assignment_total}
            unit={unit}
          />
          <PaymentSummaryCard title="Payment summary" unit={unit} list={checkList} total_price={total_price} />
        </div>
        <div className={css.container}>
          <PaymentMethods
            crypto_method={
              isPaidCrypto ? (
                <Dapp.Connect />
              ) : (
                <Button color="white" disabled={!isPaidCrypto}>
                  <>
                    <img src="/icons/crypto/walletconnect.svg" width={18} height={18} />
                    Connect Wallet
                  </>
                </Button>
              )
            }
            fiat_method={
              <Button
                color="white"
                disabled={isPaidCrypto || cards?.items?.length >= 3}
                onClick={() => setOpenAddCardModal(true)}
              >
                <>
                  <img src="/icons/debit.svg" width={18} height={18} />
                  Add Credit Card
                </>
              </Button>
            }
            added_cards={!isPaidCrypto ? cards?.items : []}
            selectedCard={selectedCard}
            onSelectCard={onSelectCard}
            // onEditCard={(id) => navigate({ to: `edit-card/${id}` })}
            onRemoveCard={onRemoveCard}
          />
          <Button color="blue" disabled={isDisabledProceedPayment} className={css.btn} onClick={onClickProceedPayment}>
            Proceed with payment
          </Button>
        </div>
      </TwoColumnCursor>
      <AddCardModal
        open={openAddCardModal}
        onClose={() => setOpenAddCardModal(false)}
        setCardsList={(list) => setCardsList(list)}
        currency={offer.currency}
      />
    </>
  );
};
