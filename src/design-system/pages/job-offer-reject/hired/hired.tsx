import css from './hired.module.scss';
import { Accordion } from '../../../atoms/accordion/accordion';
import { ApplicantList } from '../../../molecules/applicant-list/applicant-list';
import { missionToApplicantListAdaptor } from '../job-offer-reject.services';
import { HiredProps } from './hired.types';

export const Hired = (props: HiredProps): JSX.Element => {
  const { hiredList, endHiredList } = props;

  return (
    <div className={css.container}>
      <Accordion id="hired" title={`Hired (${hiredList.total_count})`}>
        <ApplicantList hireable={false} list={missionToApplicantListAdaptor(hiredList.items)} />
      </Accordion>
      <Accordion id="end-hired" title={`End-Hired (${endHiredList.total_count})`}>
        <ApplicantList hireable={false} list={missionToApplicantListAdaptor(endHiredList.items)} />
      </Accordion>
    </div>
  );
};
