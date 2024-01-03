import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLoaderData } from 'react-router-dom';
import { JobsRes, jobs } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useJobListing = () => {
  const data = useLoaderData() as JobsRes;
  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [jobsList, setJobsList] = useState(data.items);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  const fetchMore = async (page: number) => {
    const data = await jobs({ page: page, status: 'ACTIVE', limit: 5 });
    if (isMobile) setJobsList((prevList) => [...prevList, data.items]);
    else setJobsList(data.items);
  };
  useEffect(() => {
    fetchMore(page);
  }, [page]);
  return { setPage, ref, jobsList, total: data.total_count, PER_PAGE, isMobile, PER_PAGE };
};
