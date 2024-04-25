import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CurrentIdentity, getOrganization, Job, Organization, QuestionsRes } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { getIdentityMeta } from 'src/core/utils';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
import { ApplyExternalPartyModal } from 'src/Nowruz/modules/Jobs/components/applyExternalPartyModal';
import { ApplyModal } from 'src/Nowruz/modules/Jobs/components/applyModal';
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
  const navigate = useNavigate();

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const [organization, setOrganization] = useState<Organization>();
  const [justApplied, setJustApplied] = useState(false);
  const [beforeApplied, setBeforeApplied] = useState(jobDetail.applied);
  const [openApply, setOpenApply] = useState(false);
  const [openExternalApply, setOpenExternalApply] = useState(false);

  const { usernameVal } = getIdentityMeta(organization);

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

  const onProfileCardClick = () => {
    if (usernameVal) {
      navigate(`/profile/organizations/${usernameVal}/view`);
    }
  };

  const userJSX = () => (
    <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16">
      <div className="flex px-4 md:hidden">
        {justApplied && (
          <div className={css.section1}>
            <FeaturedIconOutlined iconName="check-circle" size="md" theme="primary" />
            <Typography variant="subtitle2" className="text-Brand-700">
              Your application has been successfully submitted
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
                Your application has been successfully submitted
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
        <ProfileCard identity={organization} onProfileCardClick={onProfileCardClick} />
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
