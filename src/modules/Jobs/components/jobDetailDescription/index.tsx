import React from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';
import { translate } from 'src/core/utils';
import { ExpandableText } from 'src/modules/general/components/expandableText';

import css from './jobDetailDescription.module.scss';

interface JobDetailDescriptionProps {
  jobDescription: string;
}
export const JobDetailDescription: React.FC<JobDetailDescriptionProps> = ({ jobDescription }) => {
  const maxLength = isTouchDevice() ? 130 : 1150;
  return (
    <div className={css.container}>
      <h2 className={css.title}>{translate('job-desc')}</h2>
      <div className={css.expandable}>
        <ExpandableText text={jobDescription || ''} expectedLength={maxLength} isMarkdown />
      </div>
    </div>
  );
};
