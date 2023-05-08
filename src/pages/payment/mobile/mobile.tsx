import { useNavigate } from '@tanstack/react-location';
import Dapp from 'src/dapp';
import { Header } from 'src/components/atoms/header-v2/header';
import { Button } from 'src/components/atoms/button/button';
import { JobDescrioptionCard } from 'src/components/templates/job-description-card';
import { PaymentSummaryCard } from 'src/components/templates/payment-summary-card';
import { PaymentMethods } from 'src/components/templates/payment-methods';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Sticky } from 'src/components/templates/sticky';
import { usePaymentShared } from '../payment.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const navigate = useNavigate();
  const {
    offer,
    commision,
    total_price,
    start_date,
    isPaidCrypto,
    cards,
    selectedCard,
    onSelectCard,
    onRemoveCard,
    onClickProceedPayment,
    isDisabledProceedPayment,
  } = usePaymentShared();
  const { job_category, recipient, project, total_hours, assignment_total } = offer || {};
  const { avatar, city, country, name: applicant_name } = recipient?.meta || {};

  return (
    <TopFixedMobile>
      <Header title="Escrow payment" onBack={() => history.back()} />
      <>
        <div className={css['container']}>
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
            location={`${city}, ${country}`}
          />
          <div className={css['container__spacer']}>
            <PaymentSummaryCard
              title="Payment summary"
              list={[
                { title: 'Total assignement', price: assignment_total },
                { title: ' Socious commision', price: commision },
              ]}
              total_price={total_price}
            />
          </div>
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
              <Button color="white" disabled={isPaidCrypto} onClick={() => navigate({ to: 'add-card' })}>
                <>
                  <img src="/icons/debit.svg" width={18} height={18} />
                  Add Credit Card
                </>
              </Button>
            }
            added_cards={!isPaidCrypto ? cards?.items : []}
            selectedCard={selectedCard}
            onSelectCard={onSelectCard}
            onEditCard={(id) => navigate({ to: `edit-card/${id}` })}
            onRemoveCard={onRemoveCard}
          />
        </div>
        <Sticky>
          <Button
            color="blue"
            disabled={isDisabledProceedPayment}
            className={css['footer__btn']}
            onClick={onClickProceedPayment}
          >
            Proceed with payment
          </Button>
          <Button
            color="white"
            className={`${css['footer__btn']} ${css['footer__btn--cancel']}`}
            onClick={() => history.back()}
          >
            Cancel
          </Button>
        </Sticky>
      </>
    </TopFixedMobile>
  );
};
