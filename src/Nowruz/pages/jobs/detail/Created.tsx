import { useLoaderData } from 'react-router-dom';
import { Job, QuestionsRes } from 'src/core/api';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import { JobDetailHeader } from 'src/Nowruz/modules/Jobs/components/jobDetailHeader';

import css from './jobDetail.module.scss';
import { useJobDetailTabs } from './useJobDetailTabs';

export const CreatedDetail = () => {
  const { jobDetail } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };

  const { tabs } = useJobDetailTabs(jobDetail, false);

  const organizationJSX = () => (
    <div className="md:px-8">
      <HorizontalTabs tabs={tabs} />
    </div>
  );

  return (
    <div className={css.container}>
      <JobDetailHeader job={jobDetail} />
      {organizationJSX()}
    </div>
  );
};
