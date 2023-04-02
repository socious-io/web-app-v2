import { useState, useEffect } from 'react';
import { useMatch } from '@tanstack/react-location';
import Web3 from 'web3';
import { Header } from 'src/components/atoms/header-v2/header';
import { Button } from 'src/components/atoms/button/button';
import { JobDescrioptionCard } from 'src/components/templates/job-description-card';
import { PaymentSummaryCard } from 'src/components/templates/payment-summary-card';
import { PaymentMethods } from 'src/components/templates/payment-methods';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Sticky } from 'src/components/atoms/sticky';
import { confirmPayment } from './mobile.service';
import Dapp from 'src/dapp';
import { endpoint } from 'src/core/endpoints';
import { getMonthName } from 'src/core/time';
//FIXME: create a general Resolver types to use in every page
import { Resolver } from 'src/pages/offer-received/offer-received.types';
import css from './mobile.module.scss';
import { useAccount } from 'wagmi';

export const Mobile = (): JSX.Element => {
  const { offer } = useMatch().ownData as Resolver;
  const offerId = offer.id;
  const {
    job_category: { name: job_name },
    created_at,
    recipient: {
      meta: { name: applicant_name, avatar, city, country },
      type,
    },
    project: { payment_scheme },
    total_hours,
    assignment_total,
    project_id,
  } = offer;
  //FIXME: if no contribute not allow to continue flow
  const contributor = offer.recipient.meta.wallet_address;
  const commision = assignment_total * 0.03;
  const total_price = commision + assignment_total;
  const start_date = getMonthName(created_at) + ' ' + new Date(created_at).getDate();

  const amount = assignment_total.toString();
  const { web3 } = Dapp.useWeb3();
  const [process, setProcess] = useState(false);
  const { address: account, isConnected } = useAccount();

  async function proceedPayment() {
    // FIXME: please handle this errors in a proper way
    if (!web3) throw new Error('Not allow web3 is not connected');
    if (!contributor) throw new Error('Contributor wallet is not connected');

    setProcess(true);
    const escrowAmount = parseInt(amount);

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

    endpoint.post.offers['{offer_id}/hire'](offerId).then(() => history.back());
    setProcess(false);
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
          {
            /* FIXME POSITION DESIGN PLEASE */
            <Dapp.Connect />
          }
          <PaymentMethods
            payement_methods={[
              {
                button: {
                  color: 'white',
                  disabled: true,
                  children: (
                    <>
                      <img src="/icons/debit.svg" width={18} height={18} />
                      Add Credit Card
                    </>
                  ),
                },
              },
            ]}
          />
        </div>
        <Sticky>
          <Button
            color="blue"
            disabled={process || !isConnected || !account}
            className={css['footer__btn']}
            onClick={() => proceedPayment()}
          >
            Proceed with payment
          </Button>
          <Button
            color="white"
            className={`${css['footer__btn']} ${css['footer__btn--cancel']}`}
            onClick={() => console.log('cancel')}
          >
            Cancel
          </Button>
        </Sticky>
      </>
    </TopFixedMobile>
  );
};
