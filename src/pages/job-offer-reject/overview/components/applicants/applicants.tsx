import { Accordion } from 'src/components/atoms/accordion/accordion';
import { ApplicantList } from 'src/components/molecules/applicant-list/applicant-list';

import { ApplicantsProps } from './applicants.types';
import { applicantToApplicantListAdaptor, rejectApplicant } from '../../../job-offer-reject.services';

export const Applicants = (props: ApplicantsProps): JSX.Element => {
  const { toReviewList, declinedList, onOfferClick, onRejectClick } = props;
  const navigate = {};

  function onApplicantClick(applicantId: string) {
    navigate({ to: `./${applicantId}` });
  }

  function onMessageClick(id: string) {
    navigate({ to: `/chats/new/${id}` });
  }

  return (
    <div>
      <Accordion id="to-review" title={`To review (${toReviewList.total_count})`}>
        <ApplicantList
          onApplicantClick={onApplicantClick}
          onOfferClick={onOfferClick}
          onRejectClick={onRejectClick}
          hireable
          list={applicantToApplicantListAdaptor(toReviewList.items)}
          onMessageClick={onMessageClick}
        />
      </Accordion>
      <Accordion id="declined" title={`Declined (${declinedList.total_count})`}>
        <ApplicantList
          hireable={false}
          list={applicantToApplicantListAdaptor(declinedList.items)}
          onMessageClick={onMessageClick}
        />
      </Accordion>
    </div>
  );
};
