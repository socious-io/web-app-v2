import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, getOrganization, Job, Organization, QuestionsRes } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
import { AppliedAlerts } from 'src/Nowruz/modules/Jobs/components/appliedAlerts';
import { JobDetailAbout } from 'src/Nowruz/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/Nowruz/modules/Jobs/components/jobDetailDescription';
import { JobDetailHeader } from 'src/Nowruz/modules/Jobs/components/jobDetailHeader';
import { RootState } from 'src/store';

import css from './jobDetail.module.scss';

export const JobDetail = () => {
  const { jobDetail } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };
  const currentIdentity = useSelector<RootState, CurrentIdentity>((state) => {
    const current = state.identity.entities.find((identity) => identity.current);
    return current as CurrentIdentity;
  });

  console.log(currentIdentity.type);

  const [organization, setOrganization] = useState<Organization>();

  useEffect(() => {
    getOrganization(jobDetail.identity_meta.id).then((res) => setOrganization(res));
  }, []);

  const userJSX = () => (
    <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16">
      {jobDetail.applied && currentIdentity.type === 'users' && (
        <div className="flex px-4 md:hidden">
          <AppliedAlerts />
        </div>
      )}
      <div className="md:mr-16">
        <JobDetailAbout isUser={true} />
      </div>
      <div className={css.content}>
        {jobDetail.applied && currentIdentity.type === 'users' && (
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

  return (
    <div className={css.container}>
      <JobDetailHeader job={jobDetail} isUser={true} />
      {userJSX()}
    </div>
  );
};
