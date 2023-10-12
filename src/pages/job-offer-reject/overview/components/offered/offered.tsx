import { useLoaderData, useNavigate } from 'react-router-dom';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { ApplicantListHire } from 'src/components/molecules/applicant-list-hire/applicant-list-hire';
import { isTouchDevice } from 'src/core/device-type-detector';
import { Loader } from 'src/pages/job-offer-reject/job-offer-reject.types';

import css from './offered.module.scss';
import { jobToApplicantListAdaptor } from './offered.services';
import { OfferedProps } from './offered.types';
import { endpoint } from '../../../../../core/endpoints';

export const Offered = (props: OfferedProps): JSX.Element => {
  const navigate = useNavigate();
  const resolver = useLoaderData() as Loader;
  const {
    jobOverview: { payment_type },
  } = resolver;
  async function onHire(offerId: string) {
    if (payment_type === 'PAID' && !props.approved.items[0]?.escrow) {
      navigate(`/payment/${offerId}`);
    } else {
      endpoint.post.offers['{offer_id}/hire'](offerId).then(() =>
        navigate(`/jobs/created/${resolver?.jobOverview.id}`),
      );
    }
  }

  async function onReject(offerId: string) {
    return endpoint.post.offers['{offer_id}/cancel'](offerId).then(() =>
      navigate(`/jobs/created/${resolver?.jobOverview.id}`),
    );
  }

  function onMessageClick(id: string) {
    navigate(`/jobs/created/${resolver?.jobOverview.id}`);
    navigate(`/chats/new/${id}`);
  }

  return (
    <div className={css.container}>
      <Accordion id="sent" title={`Sent (${props.sent.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onHireClick={console.log}
          onRejectClick={console.log}
          list={jobToApplicantListAdaptor(props.sent.items)}
          onMessageClick={onMessageClick}
        />
      </Accordion>
      <Accordion id="approved" title={`Approved (${props.approved.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onHireClick={onHire}
          onRejectClick={onReject}
          hireable
          required_payment={payment_type === 'PAID' && !props.approved.items[0]?.escrow}
          list={jobToApplicantListAdaptor(props.approved.items)}
          onMessageClick={onMessageClick}
        />
      </Accordion>
      <Accordion id="hired" title={`Hired (${props.hired.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onHireClick={console.log}
          onRejectClick={console.log}
          list={jobToApplicantListAdaptor(props.hired.items)}
          onMessageClick={onMessageClick}
        />
      </Accordion>
      <Accordion id="closed" title={`Closed (${props.closed.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onHireClick={console.log}
          onRejectClick={console.log}
          list={jobToApplicantListAdaptor(props.closed.items)}
          onMessageClick={onMessageClick}
        />
      </Accordion>
    </div>
  );
};
