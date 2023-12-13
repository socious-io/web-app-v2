import React from 'react';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { JobCreateHeader } from 'src/Nowruz/modules/Jobs/jobCreate/components/Header';
import { JobCreateForm } from 'src/Nowruz/modules/Jobs/jobCreate/containers/JobCreateForm';

export const CreateJob = () => {
  return (
    <div className="p-6 md:p-8">
      <JobCreateForm />
    </div>
  );
};
