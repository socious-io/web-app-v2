import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { JobsRes, jobs } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useJobListing = () => {
  const data = useLoaderData() as JobsRes;

  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [jobsList, setJobsList] = useState(data.items);
  const [page, setPage] = useState(1);

  const fetchMore = async (page: number) => {
    const data = await jobs({ page: page, status: 'ACTIVE', limit: 5 });

    if (isMobile && page > 1) setJobsList([...jobsList, ...data.items]);
    else setJobsList(data.items);
  };
  useEffect(() => {
    fetchMore(page);
  }, [page]);
  return { page, setPage, jobsList, total: data.total_count, PER_PAGE, isMobile };
};
