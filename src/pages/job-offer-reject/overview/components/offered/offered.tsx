import { Accordion } from '../../../../../components/atoms/accordion/accordion';
import { ApplicantListHire } from '../../../../../components/molecules/applicant-list-hire/applicant-list-hire';
import { Applicant } from '../../../../../components/molecules/applicant-list/applicant-list.types';
import { Offer } from '../../../../../core/endpoints/index.types';
import { isoToStandard } from '../../../../../core/time';
import css from './offered.module.scss';
import { OfferedProps } from './offered.types';

export function jobToApplicantListAdaptor(applicant: Offer[]): Applicant[] {
  if (applicant.length === 0) {
    return [];
  }
  return applicant.map((item) => {
    return {
      id: item.id,
      name: item.recipient.meta.name,
      image: item.recipient.meta.avatar || '',
      profileLink: '',
      applyDate: isoToStandard(item.created_at),
      coverLetter: '',
      //   status: item.status,
    };
  });
}

export const Offered = (props: OfferedProps): JSX.Element => {
  return (
    <div className={css.container}>
      <Accordion id="sent" title={`Sent (${props.sent.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onOfferClick={console.log}
          onRejectClick={console.log}
          list={jobToApplicantListAdaptor(props.sent.items)}
        />
      </Accordion>
      <Accordion id="approved" title={`Approved (${props.approved.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onOfferClick={console.log}
          onRejectClick={console.log}
          hireable
          list={jobToApplicantListAdaptor(props.approved.items)}
        />
      </Accordion>
      <Accordion id="hired" title={`Hired (${props.hired.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onOfferClick={console.log}
          onRejectClick={console.log}
          list={jobToApplicantListAdaptor(props.hired.items)}
        />
      </Accordion>
      <Accordion id="closed" title={`Closed (${props.closed.total_count})`}>
        <ApplicantListHire
          onApplicantClick={console.log}
          onOfferClick={console.log}
          onRejectClick={console.log}
          list={jobToApplicantListAdaptor(props.closed.items)}
        />
      </Accordion>
    </div>
  );
};
