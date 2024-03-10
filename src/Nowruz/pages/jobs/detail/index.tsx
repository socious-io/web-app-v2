import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, getOrganization, Job, Organization, QuestionsRes } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
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

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  console.log(jobDetail);
  const [organization, setOrganization] = useState<Organization>();
  const [justApplied, setJustApplied] = useState(false);
  const [beforeApplied, setBeforeApplied] = useState(jobDetail.applied);

  useEffect(() => {
    getOrganization(jobDetail.identity_meta.id).then((res) => setOrganization(res));
  }, []);

  const userJSX = () => (
    <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16">
      <div className="flex px-4 md:hidden">
        {justApplied && (
          <div className={css.section1}>
            <FeaturedIconOutlined iconName="check-circle" size="md" theme="primary" />
            <Typography variant="subtitle2" className="text-Brand-700">
              You application has been successfully submitted
            </Typography>
          </div>
        )}
        {beforeApplied && currentIdentity?.type === 'users' && (
          <div className={css.section2}>
            <FeaturedIconOutlined iconName="info-circle" size="md" theme="gray" />
            <Typography variant="subtitle2" className="text-Gray-light-mode-700">
              You have applied for this job
            </Typography>
          </div>
        )}
      </div>

      <div className="md:mr-16">
        <JobDetailAbout isUser={true} applied={justApplied || beforeApplied} setJustApplied={setJustApplied} />
      </div>
      <div className={css.content}>
        <div className="hidden md:flex">
          {justApplied && (
            <div className={css.section1}>
              <FeaturedIconOutlined iconName="check-circle" size="md" theme="primary" />
              <Typography variant="subtitle2" className="text-Brand-700">
                You application has been successfully submitted
              </Typography>
            </div>
          )}
          {beforeApplied && currentIdentity?.type === 'users' && (
            <div className={css.section2}>
              <FeaturedIconOutlined iconName="info-circle" size="md" theme="gray" />
              <Typography variant="subtitle2" className="text-Gray-light-mode-700">
                You have applied for this job
              </Typography>
            </div>
          )}
        </div>

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
      <JobDetailHeader job={jobDetail} applied={justApplied || beforeApplied} setJustApplied={setJustApplied} />
      {userJSX()}
    </div>
  );
};
