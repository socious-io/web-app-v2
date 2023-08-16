import { useNavigate } from '@tanstack/react-location';
import Dapp from 'src/dapp';
import { Header } from 'src/components/atoms/header-v2/header';
import { Button } from 'src/components/atoms/button/button';
import { JobDescrioptionCard } from 'src/components/templates/job-description-card';
import { PaymentSummaryCard } from 'src/components/templates/payment-summary-card';
import { PaymentMethods } from 'src/components/templates/payment-methods';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Sticky } from 'src/components/templates/sticky';
import { printWhen } from 'src/core/utils';
import { usePaymentShared } from '../payment.shared';
import css from './mobile.module.scss';
import {HourlySubmissionsCard} from "../../../components/templates/hourly-submissions-card";

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    offer,
    assignment_total,
    unit,
    commision,
    total_price,
    start_date,
    cards,
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
    <TopFixedMobile>
      <Header title="Escrow payment" onBack={() => history.back()} />
      <>
        {printWhen(offeredMessageBoxJSX, status === 'APPROVED')}
        {printWhen(acceptedMessageBoxJSX, status === 'HIRED')}
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
            username={applicant_username}
            location={`${city}, ${country}`}
            total_mission={assignment_total}
            unit={unit}
            payment_scheme={project?.payment_scheme}
          />
            {printWhen(<HourlySubmissionsCard title="Hourly Submissions" start_date={start_date} end_date="Present" submissions={[]}/>,project.payment_scheme === "HOURLY")}
          <div className={css['container__spacer']}>
            <PaymentSummaryCard
              title="Payment summary"
              unit={unit}
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
              <Button
                color="white"
                disabled={isPaidCrypto || cards?.items?.length >= 3}
                onClick={() => navigate({ to: 'add-card' })}
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
