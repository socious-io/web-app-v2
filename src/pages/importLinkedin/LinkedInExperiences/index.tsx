import React from 'react';

import { useLinkedInExperiences } from './useLinkedInExperiences';
import { ImportLinkedInLayout } from '../../../modules/importLinkedIn/containers/ImportLinkedInLayout/ImportLinkedInLayout';

export const LinedInExperiences = () => {
  const {
    data: { experiences },
  } = useLinkedInExperiences();
  return (
    <ImportLinkedInLayout
      title="Career milestones matter"
      subtitle="Ensure all roles and key achievements are included. A complete career profile boosts your job prospects."
    >
      <div className="px-4 py-6 md:px-6 flex flex-col"></div>
    </ImportLinkedInLayout>
  );
};
