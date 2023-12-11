import React from 'react';
import { JobCreateHeader } from 'src/Nowruz/modules/Jobs/jobCreate/components/Header';
import { JobCreateForm } from 'src/Nowruz/modules/Jobs/jobCreate/containers/JobCreateForm';

export const CreateJob = () => {
  return (
    <div className="p-8 sm:p-5">
      <JobCreateForm />
    </div>
  );
};
