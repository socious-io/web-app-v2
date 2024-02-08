import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';
import { CurrentIdentity, getOrganization, Job, Organization, QuestionsRes } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
import { AppliedAlerts } from 'src/Nowruz/modules/Jobs/components/appliedAlerts';
import { JobDetailAbout } from 'src/Nowruz/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/Nowruz/modules/Jobs/components/jobDetailDescription';
import { JobDetailHeader } from 'src/Nowruz/modules/Jobs/components/jobDetailHeader';
import { RootState } from 'src/store';

import css from './jobDetail.module.scss';
import { useJobDetailTabs } from './useJobDetailTabs';

export const JobDetail = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity: CurrentIdentity) => identity.current);
  });
  const location = useLocation();

  const isUser = currentIdentity?.type === 'users' || !currentIdentity;
  const { jobDetail } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };
  const [organization, setOrganization] = useState<Organization>();
  const { tabs } = useJobDetailTabs(jobDetail, isUser);

  useEffect(() => {
    getOrganization(jobDetail.identity_meta.id).then((res) => setOrganization(res));
  }, []);

  const userJSX = () => (
    <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16">
      {jobDetail.applied && (
        <div className="flex px-4 md:hidden">
          <AppliedAlerts />
        </div>
      )}
      <div className="md:mr-16">
        <JobDetailAbout isUser={isUser} />
      </div>
      <div className={css.content}>
        {jobDetail.applied && (
          <div className="hidden md:flex">
            <AppliedAlerts />
          </div>
        )}
        <JobDetailDescription jobDescription={jobDetail.description} />
        <ProfileCard identity={organization} />
        <div className={css.expandable}>
          <ExpandableText isMarkdown expectedLength={isTouchDevice() ? 115 : 700} text={organization?.mission || ''} />
        </div>
      </div>
    </div>
  );

  const organizationJSX = () => (
    <div className="md:px-8">
      <HorizontalTabs tabs={tabs} />
    </div>
  );

  return (
    <div className={css.container}>
      <JobDetailHeader job={jobDetail} isUser={isUser} />
      {isUser ? userJSX() : organizationJSX()}
    </div>
  );
};
