import React from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';

import css from './jobDetailDescription.module.scss';

interface JobDetailDescriptionProps {
  jobDescription: string;
}
export const JobDetailDescription: React.FC<JobDetailDescriptionProps> = ({ jobDescription }) => {
  const maxLenght = isTouchDevice() ? 130 : 1150;
  return (
    <div className={css.container}>
      <h2 className={css.title}>Job description</h2>
      <div className={css.expandable}>
        <ExpandableText text={jobDescription || ''} expectedLength={maxLenght} isMarkdown />
      </div>
    </div>
  );
};
