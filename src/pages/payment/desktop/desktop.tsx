import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { JobDescrioptionCard } from 'src/components/templates/job-description-card';
import { PaymentSummaryCard } from 'src/components/templates/payment-summary-card';
import { PaymentMethods } from 'src/components/templates/payment-methods';
import { Button } from 'src/components/atoms/button/button';
import { BackLink } from 'src/components/molecules/back-link';
import Dapp from 'src/dapp';
import { usePaymentShared } from '../payment.shared';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const { offer, commision, total_price, start_date, isPaidCrypto, onClickProceedPayment, isDisabledProceedPayment } =
    usePaymentShared();
  const {
    job_category: { name: job_name },
    recipient: {
      meta: { name: applicant_name, avatar, city, country },
      type,
    },
    project: { payment_scheme },
    total_hours,
    assignment_total,
  } = offer || {};

  return (
    <TwoColumnCursor>
      <div className={`${css.container} ${css.right}`}>
        <BackLink title="Return" onBack={() => history.back()} />
        <JobDescrioptionCard
          job_title={job_name}
          start_date={start_date}
          end_date="Present"
          info_list={[
            { icon: 'suitcase', name: payment_scheme },
            { icon: 'hourglass', name: `${total_hours} hrs` },
          ]}
          img={avatar as string}
          type={type}
          name={applicant_name}
          location={`${city}, ${country}`}
        />
        <PaymentSummaryCard
          title="Payment summary"
          list={[
            { title: 'Total assignement', price: assignment_total },
            { title: ' Socious commision', price: commision },
          ]}
          total_price={total_price}
        />
      </div>
      <div className={css.container}>
        <PaymentMethods
           crypto_method={
            isPaidCrypto ? (
              <Dapp.Connect />
            ) : (
              <Button color="white" disabled={!isPaidCrypto} >
                <>
                  <img src="/icons/crypto/walletconnect.svg" width={18} height={18} />
                  Connect Wallet
                </>
              </Button>
            )
          }
          fiat_method={
            <Button color="white" disabled={true}>
              <>
                <img src="/icons/debit.svg" width={18} height={18} />
                Add Credit Card
              </>
            </Button>
          }
        />
        <Button color="blue" disabled={isDisabledProceedPayment} className={css.btn} onClick={onClickProceedPayment}>
          Proceed with payment
        </Button>
      </div>
    </TwoColumnCursor>
  );
};
