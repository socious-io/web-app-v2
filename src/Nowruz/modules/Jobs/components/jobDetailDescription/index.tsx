import React from 'react';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { isTouchDevice } from 'src/core/device-type-detector';

import css from './jobDetailDescription.module.scss';

interface JobDetailDescriptionProps {
  jobDescription: string;
}
export const JobDetailDescription: React.FC<JobDetailDescriptionProps> = ({ jobDescription }) => {
  const maxLenght = isTouchDevice() ? 130 : 1150;
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <h2 className={css.title}>Job description</h2>
      <ExpandableText text={jobDescription} expectedLength={maxLenght} isMarkdown />
    </div>
  );
};
