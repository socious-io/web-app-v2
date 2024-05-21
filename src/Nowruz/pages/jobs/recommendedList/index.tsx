import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { RecommendedJobListing } from 'src/Nowruz/modules/Jobs/modules/recommendedJobListing';

import css from './recommended.module.scss';

export const RecommendedList = () => {
  const navigate = useNavigate();
  return (
    <div className={css.container}>
      <div className={`flex flex-col gap-5 justify-start md:justify-between`}>
        <BackLink title="All jobs" onBack={() => navigate('/jobs')} customStyle="w-fit" />

        <div className={css.header}>
          <h1 className={css.title}>Recommendations</h1>
          <h2 className={css.subtitle}>Based on your profile and search history</h2>
        </div>
      </div>
      <div className={css.list}>{<RecommendedJobListing />}</div>
    </div>
  );
};
