import { Modal } from '@mui/material';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';

import { JobPreviewModalProps } from './JobPreviewModal.types';
import css from './preview-modal.module.scss';
import { JobInfoCard } from '../JobInfoCard';

export const JobPreviewModal: React.FC<JobPreviewModalProps> = ({ open, onClose, company, job }) => {
  const isMobile = window.innerWidth < 600;
  console.log(job);
  return (
    <Modal open={open} onClose={onClose} className={css.container}>
      <div className={css.content}>
        <div className={css.header}>
          <span>Job preview</span>
          <Icon fontSize={24} name="x-close" onClick={() => onClose()} className="cursor-pointer" />
        </div>
        <div className={css.body}>
          <div className={css.intro}>
            <Avatar type="organizations" size="72px" img={company?.image} />
            <div className={css.jobTitle}>{job?.title}</div>
            <div className={css.subTitle}>{company?.name} . Just now</div>
            <div className="flex flex-wrap gap-2 mt-5">
              {job?.socialCause && <Chip label={job?.socialCause} theme="primary" />}
              {job?.skills.map((item) => <Chip key={item} label={item} theme="grey_blue" />)}
            </div>

            <div className={`${css.subTitle} mt-4`}>
              <ExpandableText text={company?.mission} isMarkdown expectedLength={160} />
            </div>
          </div>
          <div className={css.info}>
            <div className={css.description}>
              <span className={css.descriptionTitle}>Job description</span>
              <div className="mt-6">
                <ExpandableText text={job?.description || ''} isMarkdown />
              </div>
            </div>
            <div>
              <div className={`${css.descriptionTitle} mb-6`}>About this job</div>
              <JobInfoCard payload={job} />
            </div>
          </div>
        </div>
        <div className={css.footer}>
          <Button color="secondary" variant="outlined" customStyle="mt-2 md:mt-0" onClick={onClose} block={isMobile}>
            Close
          </Button>
          <Button color="primary" variant="contained" customStyle="md:ml-3" block={isMobile}>
            Publish
          </Button>
        </div>
      </div>
    </Modal>
  );
};
