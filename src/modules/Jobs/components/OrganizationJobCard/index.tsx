import { Button, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Applicant, Job, jobApplicants } from 'src/core/api';
import { isoToStandard } from 'src/core/time';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Chip } from 'src/modules/general/components/Chip';
import { IconButton } from 'src/modules/general/components/iconButton';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './organization-job-card.module.scss';

interface OrganizationJobCardProps {
  job: Job;
  page: number;
  filter: 'all' | 'archived';
}
export const OrganizationJobCard: React.FC<OrganizationJobCardProps> = ({ job, page, filter }) => {
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState([] as Applicant[]);
  const isActive = job.status === 'ACTIVE';
  const startIcon = isActive ? <div className={css.dotIcon} /> : <></>;
  const label = isActive ? 'Active' : 'Closed';
  const theme = isActive ? 'success' : 'error';
  const applicantsLabel = job.applicants === 1 ? 'applicant' : 'applicants';

  const getApplicants = useCallback(async () => {
    setLoading(true);
    const data = await jobApplicants(job.id, { page: 1, status: 'PENDING', limit: 100 });
    setApplicants(data.items);
    setLoading(false);
  }, [job.id]);

  useEffect(() => {
    getApplicants();
  }, [job]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/jobs/created/${job.id}?page=${page}&filter=${filter}`);
  };
  const handleEdit = () => {
    navigate(`/jobs/edit/${job.id}?page=${page}&filter=${filter}`);
  };
  return (
    <div className={`${css.container} cursor-pointer`} onClick={handleClick}>
      <div className={css.cardInfo}>
        <div>
          <div className={css.intro}>
            <div className={css.left}>
              <div className={css.jobTitle}>{job.title}</div>
              <div className={css.subTitle}>Posted on {isoToStandard(job.updated_at?.toString() || '')}</div>
            </div>
            <div className={css.right}>
              <IconButton
                iconName="pencil-01"
                iconSize={20}
                iconColor={variables.color_grey_600}
                onClick={e => {
                  e.stopPropagation();
                  handleEdit();
                }}
                size="medium"
              />
            </div>
          </div>
        </div>
        <div className={css.footer}>
          {!loading ? (
            <div className={css.left}>
              <p className={css.applicants}>
                {!applicants.length ? 'No applicants' : `${applicants.length} ${applicantsLabel}`}
              </p>
              <div className={css.avatars}>
                {applicants.slice(0, 3).map(applicant => (
                  <div key={applicant.id} className={css.avatarItem}>
                    <Avatar type="users" size="20px" img={applicant.user.avatar as unknown as string} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-start items-center gap-2">
              <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
              <Skeleton variant="circular" width={20} height={20} />
            </div>
          )}
          <div className={css.right}>
            <Chip startIcon={startIcon} label={label} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};
