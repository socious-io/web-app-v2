import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { CurrentIdentity, Job } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { AuthGuard } from 'src/Nowruz/modules/authGuard';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { RootState } from 'src/store';

import css from './jobDetailHeader.module.scss';
import { ApplyModal } from '../applyModal';

interface JobDetailHeaderProps {
  job: Job;
  applied?: boolean;
  setJustApplied?: (applied: boolean) => void;
}

export const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ job, applied, setJustApplied }) => {
  const navigate = useNavigate();
  const [openApply, setOpenApply] = useState(false);
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  useEffect(() => {
    nonPermanentStorage.get('openApplyModal').then((res) => {
      if (currentIdentity && res && !job.applied) setOpenApply(true);
      nonPermanentStorage.remove('openApplyModal');
    });
  }, []);

  const socialCauses = socialCausesToCategory(job.causes_tags).map((item) => item.label);
  const skills = skillsToCategory(job.skills).map((item) => item.label);

  const handleCloseApplyModal = (applied: boolean) => {
    if (setJustApplied) setJustApplied(applied);
    setOpenApply(false);
  };
  return (
    <>
      <div className={css.container}>
        <BackLink
          title="Back to jobs"
          onBack={() => navigate(currentIdentity?.type === 'organizations' ? '/jobs/created' : '/jobs')}
          customStyle="w-fit"
        />
        <Avatar size="72px" type="organizations" img={job.identity_meta.image} hasBorder isVerified={false} />
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className={css.jobTitle}>{job.title}</h1>
            <div className="flex">
              <button className={`${css.subtitle} cursor-pointer`}>{job.identity_meta.name}</button>
              <span className={css.subtitle}>{` . ${toRelativeTime(job.created_at.toString())}`}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {socialCauses?.map((tag) => <Chip key={tag} label={tag} theme="primary" shape="round" size="lg" />)}
            {skills?.map((s) => <Chip key={s} label={s} theme="grey_blue" shape="round" size="lg" />)}
          </div>

          {/* <span className={css.subtitle}>
            <ExpandableText
              isMarkdown
              expectedLength={isTouchDevice() ? 85 : 175}
              text={job.identity_meta.mission || ''}
            />
          </span> */}
          {!applied && currentIdentity?.type !== 'organizations' && (
            <AuthGuard>
              <Button
                color="primary"
                variant="contained"
                customStyle="md:hidden w-full"
                onClick={() => setOpenApply(true)}
              >
                Apply now
              </Button>
            </AuthGuard>
          )}
          {currentIdentity?.type === 'users' && <Divider />}
        </div>
      </div>
      <ApplyModal open={openApply} handleClose={handleCloseApplyModal} />
    </>
  );
};
