import React from 'react';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './header.module.scss';
import { JobCreateHeaderProps } from './Header.types';

export const JobCreateHeader: React.FC<JobCreateHeaderProps> = ({ onPublish, onPreview }) => {
  return (
    <div className={css.container}>
      <div className={css.back}>
        <BackLink title="Back" />
      </div>
      <div className={css.titleButtons}>
        <div>
          <h1 className={css.title}>Create a new job</h1>
          <h2 className={css.description}>Tell us more about your job</h2>
        </div>
        <div className="flex space-x-3">
          <Button color="secondary" variant="outlined" onClick={onPreview}>
            Preview
          </Button>
          <Button color="primary" variant="contained" onClick={onPublish}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};
