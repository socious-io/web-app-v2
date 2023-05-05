import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { useAccount } from 'wagmi';
import Dapp from 'src/dapp';
import { Header } from 'src/components/atoms/header-v2/header';
import { Button } from 'src/components/atoms/button/button';
import { JobDescrioptionCard } from 'src/components/templates/job-description-card';
import { PaymentSummaryCard } from 'src/components/templates/payment-summary-card';
import { PaymentMethods } from 'src/components/templates/payment-methods';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Sticky } from 'src/components/templates/sticky';
import { confirmPayment } from './mobile.service';
import store from 'src/store/store';
import { hideSpinner, showSpinner } from 'src/store/reducers/spinner.reducer';
import { dialog } from 'src/core/dialog/dialog';
import { endpoint } from 'src/core/endpoints';
import { getCreditCardInfo } from '../payment.service';
import { getMonthName } from 'src/core/time';
import { Resolver } from 'src/pages/offer-received/offer-received.types';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const { web3 } = Dapp.useWeb3();
  const navigate = useNavigate();
  const { address: account, isConnected } = useAccount();
  const { offer, cardInfo } = useMatch().ownData as Resolver;
  const offerId = offer.id;
  const {
    job_category: { name: job_name },
    created_at,
    recipient: {
      meta: { name: applicant_name, avatar, city, country, wallet_address: contributor },
      type,
    },
    project: { payment_scheme, payment_type },
    total_hours,
    assignment_total,
    project_id,
    payment_mode,
  } = offer;
  const commision = assignment_total * 0.03;
  const total_price = commision + assignment_total;
  const start_date = getMonthName(created_at) + ' ' + new Date(created_at).getDate();
  const isPaidType = payment_type === 'PAID';
  const isPaidCrypto = isPaidType && payment_mode === 'CRYPTO';
  const [process, setProcess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(cardInfo?.items[0]?.id);
  const [cards, setCards] = useState(cardInfo);

  async function proceedCryptoPayment() {
    // FIXME: please handle this errors in a proper way
    if (!web3) throw new Error('Not allow web3 is not connected');
    if (!contributor) throw new Error('Contributor wallet is not connected');

    setProcess(true);
    store.dispatch(showSpinner());
    const escrowAmount = parseInt(assignment_total.toString());

    try {
      // put escrow on smart contract
      const result = await Dapp.escrow({
        web3,
        escrowAmount,
        contributor,
        projectId: project_id,
      });

      // this is paramater need to sync with backend to make Hire available
      await confirmPayment(offerId, {
        service: 'CRYPTO',
        source: account,
        txHash: result.txHash,
        meta: result,
      });
    } catch (err: any) {
      dialog.alert({
        message: err?.response?.data.error || err?.message,
        title: 'Failed',
      });
    }

    endpoint.post.offers['{offer_id}/hire'](offerId).then(() => history.back());

    setProcess(false);
    store.dispatch(hideSpinner());
  }

  async function proceedFiatPayment() {
    setProcess(true);
    try {
      await confirmPayment(offerId, {
        service: 'STRIPE',
        source: selectedCard,
      });
      endpoint.post.offers['{offer_id}/hire'](offerId).then(() => history.back());
    } catch (err: any) {
      dialog.alert({
        message: err?.response?.data.error || err?.message,
        title: 'Failed',
      });
    }
    setProcess(false);
  }

  async function removeCard(id: string) {
    setSelectedCard('');
    endpoint.post.payments['{card_id}/remove'](id);
    try {
      const result = await getCreditCardInfo();
      setCards(result);
    } catch (err: any) {
      dialog.alert({
        message: err?.response?.data.error || err?.message,
        title: 'Failed',
      });
    }
  }

  return (
    <TopFixedMobile>
      <Header title="Escrow payment" onBack={() => history.back()} />
      <>
        <div className={css['container']}>
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
            crypto_method={isPaidCrypto && <Dapp.Connect />}
            fiat_method={
              <Button color="white" disabled={isPaidCrypto} onClick={() => navigate({ to: 'add-card' })}>
                <>
                  <img src="/icons/debit.svg" width={18} height={18} />
                  Add Credit Card
                </>
              </Button>
            }
            added_cards={cards?.items}
            selectedCard={selectedCard}
            onSelectCard={(id) => setSelectedCard(id)}
            onEditCard={(id) => navigate({ to: `edit-card/${id}` })}
            onRemoveCard={removeCard}
          />
        </div>
        <Sticky>
          <Button
            color="blue"
            disabled={process || (isPaidCrypto ? !isConnected || !account : !selectedCard)}
            className={css['footer__btn']}
            onClick={() => (isPaidCrypto ? proceedCryptoPayment() : proceedFiatPayment())}
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
