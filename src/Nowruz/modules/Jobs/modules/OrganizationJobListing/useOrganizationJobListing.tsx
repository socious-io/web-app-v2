import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, Job, JobsRes, jobs } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';

export const useOrganizationJobListing = () => {
  const [jobsList, setJobsList] = useState([] as Job[]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const getJobsData = async () => {
    const active: JobsRes = await jobs({ identity_id: currentIdentity?.id, page: 1, status: 'ACTIVE' });
    const archived: JobsRes = await jobs({ identity_id: currentIdentity?.id, page: 1, status: 'EXPIRE' });
    setJobsList([...active.items, ...archived.items]);
    setTotal(active.total_count + archived.total_count);
    setLoading(false);
  };

  const PER_PAGE = 5;
  const isMobile = isTouchDevice();
  const [page, setPage] = useState(1);

  const fetchMore = async (page: number) => {
    const active = await jobs({ identity_id: currentIdentity?.id, page, status: 'ACTIVE' });
    const archived = await jobs({ identity_id: currentIdentity?.id, page, status: 'EXPIRE' });
    if (isMobile && page > 1) setJobsList([...jobsList, ...active.items, ...archived.items]);
    else setJobsList([...active.items, ...archived.items]);
  };

  useEffect(() => {
    fetchMore(page);
  }, [page]);

  useEffect(() => {
    if (currentIdentity?.id) {
      setLoading(true);
      getJobsData();
    }
  }, [currentIdentity]);

  return {
    page,
    setPage,
    jobsList,
    total: total,
    PER_PAGE,
    isMobile,
    loading,
  };
};
