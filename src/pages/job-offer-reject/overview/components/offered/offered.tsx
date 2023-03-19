import { useNavigate } from '@tanstack/react-location';
import { Accordion } from '../../../../../components/atoms/accordion/accordion';
import { ApplicantListHire } from '../../../../../components/molecules/applicant-list-hire/applicant-list-hire';
import { endpoint } from '../../../../../core/endpoints';
import css from './offered.module.scss';
import { jobToApplicantListAdaptor } from './offered.services';
import { OfferedProps } from './offered.types';

export const Offered = (props: OfferedProps): JSX.Element => {
  const navigate = useNavigate();

  async function onHire(offerId: string) {
    if (props.payment_type === "PAID") {
      navigate({ to: `/payment/${offerId}` });
    } else {
      endpoint.post.offers['{offer_id}/hire'](offerId).then(() => history.back());
    }
  }
  async function onReject(offerId: string) {
    return endpoint.post.offers['{offer_id}/cancel'](offerId).then(() => history.back());
  }

  return (
    <div className={css.container}>
      <Accordion id="sent" title={`Sent (${props.sent.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onHireClick={console.log}
          onRejectClick={console.log}
          list={jobToApplicantListAdaptor(props.sent.items)}
        />
      </Accordion>
      <Accordion
        id="approved"
        title={`Approved (${props.approved.total_count})`}
      >
        <ApplicantListHire
          onApplicantClick={console.log}
          onHireClick={onHire}
          onRejectClick={onReject}
          hireable
          required_payment={props.payment_type  === 'PAID' && !props.approved.items[0]?.escrow}
          list={jobToApplicantListAdaptor(props.approved.items)}
        />
      </Accordion>
      <Accordion id="hired" title={`Hired (${props.hired.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onHireClick={console.log}
          onRejectClick={console.log}
          list={jobToApplicantListAdaptor(props.hired.items)}
        />
      </Accordion>
      <Accordion id="closed" title={`Closed (${props.closed.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onHireClick={console.log}
          onRejectClick={console.log}
          list={jobToApplicantListAdaptor(props.closed.items)}
        />
      </Accordion>
    </div>
  );
};
