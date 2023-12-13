import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './preview-modal.module.scss';
import { JobInfoCard } from '../JobInfoCard';
export const JobPreviewModal = ({ open, onClose }) => {
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
            <Avatar type="organizations" size="72px" />
            <div className={css.jobTitle}>Product Designer</div>
            <div className={css.subTitle}>Ocean Protection . 1 day ago</div>
            <div className={`${css.subTitle} mt-4`}>
              Enables people to unleash their innovation power to Protect the Ocean.
            </div>
          </div>
          <div className={css.info}>
            <div className={css.description}>
              <span className={css.descriptionTitle}>Job description</span>
              <div className="mt-6">
                <ExpandableText
                  text={
                    'We are looking for a Product Designer able to understand our business requirements and any technical limitations, as well as be responsible for conceiving and conducting user research, interviews and surveys, and translating them into user flows, customer journey maps, wireframes, mockups and prototypes.'
                  }
                  isMarkdown
                />
              </div>
            </div>
            <JobInfoCard
              payload={{
                remotePreference: 'Remote',
                isCryptoPayment: true,
                jobLength: '3 month',
                jobType: 'part time',
                location: 'Paris',
                maxPayment: 1000,
                minPayment: 10,
                paymentType: 'fixed',
                experienceLevel: 'Entry',
              }}
            />
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
