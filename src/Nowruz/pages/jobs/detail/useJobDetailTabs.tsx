import { Job } from 'src/core/api';
import { JobDetailAbout } from 'src/Nowruz/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/Nowruz/modules/Jobs/components/jobDetailDescription';

import css from './jobDetail.module.scss';

export const useJobDetailTabs = (jobDetail: Job, isUser: boolean) => {
  const overviewJSX = () => (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
      <div className={css.description}>
        <JobDetailDescription jobDescription={jobDetail.description} />
      </div>
      <div className="md:mr-16">
        <JobDetailAbout isUser={isUser} />
      </div>
    </div>
  );

  const tabs = [{ label: 'Overview', content: overviewJSX() }];

  return {
    tabs,
  };
};
