import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, JobsRes, jobs } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';

export const useOrganizationJobListing = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const { activeJobs, archivedJobs } = useLoaderData() as {
    activeJobs: JobsRes;
    archivedJobs: JobsRes;
    userJobs: JobsRes;
  };

  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [jobsList, setJobsList] = useState([...activeJobs.items, ...archivedJobs.items]);
  const [page, setPage] = useState(1);

  const fetchMore = async (page: number) => {
    const data = await jobs({ identity_id: currentIdentity?.id, page: 1, status: 'ACTIVE' });

    if (isMobile && page > 1) setJobsList([...jobsList, ...data.items]);
    else setJobsList(data.items);
  };
  useEffect(() => {
    fetchMore(page);
  }, [page]);

  return { page, setPage, jobsList, total: activeJobs.total_count + archivedJobs.total_count, PER_PAGE, isMobile };
};
