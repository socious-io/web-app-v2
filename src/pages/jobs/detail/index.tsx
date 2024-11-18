import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, getOrganization, Job, Organization, QuestionsRes } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { translate } from 'src/core/utils';
import { ExpandableText } from 'src/modules/general/components/expandableText';
import { FeaturedIconOutlined } from 'src/modules/general/components/featuredIconOutlined';
import ProfileCard from 'src/modules/general/components/profileCard';
import { ApplyExternalPartyModal } from 'src/modules/Jobs/components/applyExternalPartyModal';
import { ApplyModal } from 'src/modules/Jobs/components/applyModal';
import { JobDetailAbout } from 'src/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/modules/Jobs/components/jobDetailDescription';
import { JobDetailHeader } from 'src/modules/Jobs/components/jobDetailHeader';
import { RootState } from 'src/store';

import css from './jobDetail.module.scss';

export const JobDetail = () => {
  const { jobDetail } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const [organization, setOrganization] = useState<Organization>();
  const [justApplied, setJustApplied] = useState(false);
  const [beforeApplied, setBeforeApplied] = useState(jobDetail.applied);
  const [openApply, setOpenApply] = useState(false);
  const [openExternalApply, setOpenExternalApply] = useState(false);

  useEffect(() => {
    getOrganization(jobDetail.identity_meta.id).then(res => setOrganization(res));
    nonPermanentStorage.get('openApplyModal').then(res => {
      if (currentIdentity && res && !jobDetail.applied) handleOpenApplyModal();
      nonPermanentStorage.remove('openApplyModal');
    });
  }, []);

  const handleOpenApplyModal = () => {
    if (jobDetail.other_party_id) setOpenExternalApply(true);
    else setOpenApply(true);
  };

  const handleCloseApplyModal = (applied: boolean) => {
    setOpenApply(false);
    if (setJustApplied) setJustApplied(applied);
  };

  const userJSX = () => (
    <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16">
      <div className="flex px-4 md:hidden">
        {justApplied && (
          <div className={css.section1}>
            <FeaturedIconOutlined iconName="check-circle" size="md" theme="primary" />
            <Typography variant="subtitle2" className="text-Brand-700">
              {translate('job-successful-app')}
            </Typography>
          </div>
        )}
        {beforeApplied && currentIdentity?.type === 'users' && (
          <div className={css.section2}>
            <FeaturedIconOutlined iconName="info-circle" size="md" theme="gray" />
            <Typography variant="subtitle2" className="text-Gray-light-mode-700">
              {translate('job-already-applied')}
            </Typography>
          </div>
        )}
      </div>

      <div className="md:pr-8">
        <JobDetailAbout
          isUser={true}
          applied={justApplied || beforeApplied}
          handleOpenApplyModal={handleOpenApplyModal}
        />
      </div>
      <div className={css.content}>
        <div className="hidden md:flex">
          {justApplied && (
            <div className={css.section1}>
              <FeaturedIconOutlined iconName="check-circle" size="md" theme="primary" />
              <Typography variant="subtitle2" className="text-Brand-700">
                {translate('job-successful-app')}
              </Typography>
            </div>
          )}
          {beforeApplied && currentIdentity?.type === 'users' && (
            <div className={css.section2}>
              <FeaturedIconOutlined iconName="info-circle" size="md" theme="gray" />
              <Typography variant="subtitle2" className="text-Gray-light-mode-700">
                {translate('job-already-applied')}
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
    <>
      <div className={css.container}>
        <JobDetailHeader
          job={jobDetail}
          applied={justApplied || beforeApplied}
          handleOpenApplyModal={handleOpenApplyModal}
        />
        {userJSX()}
      </div>
      <ApplyModal open={openApply} handleClose={handleCloseApplyModal} />
      <ApplyExternalPartyModal
        open={openExternalApply}
        handleClose={() => setOpenExternalApply(false)}
        otherPartyUrl={jobDetail.other_party_url || ''}
      />
    </>
  );
};
