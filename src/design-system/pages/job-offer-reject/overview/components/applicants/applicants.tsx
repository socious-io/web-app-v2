import { useNavigate } from '@tanstack/react-location';
import { Accordion } from '../../../../../atoms/accordion/accordion';
import { ApplicantList } from '../../../../../molecules/applicant-list/applicant-list';
import { applicantToApplicantListAdaptor } from '../../../job-offer-reject.services';
import css from './applicants.module.scss';
import { ApplicantsProps } from './applicants.types';

export const Applicants = (props: ApplicantsProps): JSX.Element => {
  const { toReviewList, declinedList } = props;
  const navigate = useNavigate();

  function onApplicantClick(applicantId: string) {
    navigate({ to: `./${applicantId}` });
  }

  return (
    <div className={css.container}>
      <Accordion id="to-review" title={`To review (${toReviewList.total_count})`}>
        <ApplicantList
          onApplicantClick={onApplicantClick}
          hireable
          list={applicantToApplicantListAdaptor(toReviewList.items)}
        />
      </Accordion>
      <Accordion id="declined" title={`Declined (${declinedList.total_count})`}>
        <ApplicantList
          hireable={false}
          list={applicantToApplicantListAdaptor(declinedList.items)}
        />
      </Accordion>
    </div>
  );
};
