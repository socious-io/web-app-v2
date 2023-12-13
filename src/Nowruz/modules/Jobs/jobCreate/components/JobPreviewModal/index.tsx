import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { JobPreviewModalProps } from './JobPreviewModal.types';
import css from './preview-modal.module.scss';
import { JobInfoCard } from '../JobInfoCard';
export const JobPreviewModal: React.FC<JobPreviewModalProps> = ({ open, onClose, company, job }) => {
  const isMobile = window.innerWidth < 600;
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
            <div className={css.jobTitle}>Product Designer</div>
            <div className={css.subTitle}>{company?.name} . Just now</div>
            <div className={`${css.subTitle} mt-4`}>{company?.description}</div>
          </div>
          <div className={css.info}>
            <div className={css.description}>
              <span className={css.descriptionTitle}>Job description</span>
              <div className="mt-6">
                <ExpandableText text={job?.description} isMarkdown />
              </div>
            </div>
            <JobInfoCard payload={job} />
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
