import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Job, QuestionsRes } from 'src/core/api';
import { JobDetailAbout } from 'src/Nowruz/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/Nowruz/modules/Jobs/components/jobDetailDescription';
import { JobDetailHeader } from 'src/Nowruz/modules/Jobs/components/jobDetailHeader';

import css from './jobDetail.module.scss';

export const JobDetail = () => {
  const { jobDetail, screeningQuestions } = useLoaderData() as { jobDetail: Job; screeningQuestions: QuestionsRes };

  return (
    <div className={css.container}>
      <JobDetailHeader job={jobDetail} />
      <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16">
        <div className="w-full">
          <JobDetailAbout job={jobDetail} />
        </div>
        <div className={css.content}>
          <JobDetailDescription jobDescription={jobDetail.description} />
        </div>
      </div>
    </div>
  );
};
