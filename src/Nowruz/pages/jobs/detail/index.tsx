import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getOrganization, Job, Organization, QuestionsRes } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
import { JobDetailAbout } from 'src/Nowruz/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/Nowruz/modules/Jobs/components/jobDetailDescription';
import { JobDetailHeader } from 'src/Nowruz/modules/Jobs/components/jobDetailHeader';

import css from './jobDetail.module.scss';

export const JobDetail = () => {
  const { jobDetail, screeningQuestions } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };

  const [organization, setOrganization] = useState<Organization>();

  useEffect(() => {
    getOrganization(jobDetail.identity_meta.id).then((res) => setOrganization(res));
  }, []);

  return (
    <div className={css.container}>
      <JobDetailHeader job={jobDetail} />
      <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16">
        <div className="md:mr-16 flex flex-1 max-w-fit">
          <JobDetailAbout job={jobDetail} />
        </div>
        <div className={css.content}>
          <JobDetailDescription jobDescription={jobDetail.description} />
          <ProfileCard identity={organization} />
          <div className={css.expandable}>
            <ExpandableText
              isMarkdown
              expectedLength={isTouchDevice() ? 115 : 700}
              text={organization?.mission || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
