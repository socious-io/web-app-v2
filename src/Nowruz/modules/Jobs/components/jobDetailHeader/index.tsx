import { Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';

import css from './jobDetailHeader.module.scss';

interface JobDetailHeaderProps {
  job: Job;
}

export const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className={css.container}>
      <BackLink title="Back to jobs" onBack={() => navigate('/nowruz/jobs/list')} customStyle="w-fit" />
      <Avatar size="72px" type="organizations" img={job.identity_meta.image} hasBorder isVerified />
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className={css.jobTitle}>{job.title}</h1>
          <div className="flex">
            <button className={`${css.subtitle} cursor-pointer`}>{job.identity_meta.name}</button>
            <span className={css.subtitle}>{` . ${toRelativeTime(job.created_at.toString())}`}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {job.causes_tags?.map((tag) => <Chip key={tag} label={tag} theme="primary" shape="round" size="lg" />)}
          {job.skills?.map((s) => <Chip key={s} label={s} theme="grey_blue" shape="round" size="lg" />)}
        </div>
        <span className={css.subtitle}>{job.identity_meta.mission}</span>
        <Button color="primary" variant="contained" customStyle="md:hidden">
          Apply now
        </Button>
        <Divider />
      </div>
    </div>
  );
};
