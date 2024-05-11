import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, Job, UserMeta, recommendedJobs } from 'src/core/api';
import { RootState } from 'src/store';

export const useRecommendedJobListing = () => {
  const [list, setList] = useState<Job[]>();
  const [loading, setLoading] = useState(false);
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );

  const getRecommendedList = async () => {
    if (!currentIdentity) return;
    setLoading(true);
    try {
      const res = await recommendedJobs((currentIdentity.meta as UserMeta).username);
      setList(res.items);
    } catch (e) {
      console.log('error in getting recommended jobs', e);
    }
    setLoading(false);
  };
  useEffect(() => {
    getRecommendedList();
  }, []);

  return { loading, list };
};
