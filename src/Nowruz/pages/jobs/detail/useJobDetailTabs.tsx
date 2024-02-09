import { Applicant, Job } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { JobDetailAbout } from 'src/Nowruz/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/Nowruz/modules/Jobs/components/jobDetailDescription';

import { Cards } from './applicants/cards';
import { Table } from './applicants/table';
import css from './jobDetail.module.scss';

export const useJobDetailTabs = (jobDetail: Job, isUser: boolean, applicants: Array<Applicant>) => {
  const overviewJSX = () => (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:flex-row-reverse">
      <div className="md:mr-16">
        <JobDetailAbout isUser={isUser} />
      </div>
      <div className={css.description}>
        <JobDetailDescription jobDescription={jobDetail.description} />
      </div>
    </div>
  );

  const applicantsJSX = () => (isTouchDevice() ? <Cards applicants={applicants} /> : <Table applicants={applicants} />);

  const tabs = [
    { label: 'Overview', content: overviewJSX() },
    { label: 'Applicants', content: applicantsJSX() },
  ];

  return {
    tabs,
  };
};
