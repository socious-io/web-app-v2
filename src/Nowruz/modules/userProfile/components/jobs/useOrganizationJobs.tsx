import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Job, JobsRes, Organization, jobs } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useOrganizationJobs = () => {
  const { organization, orgJobs } = useLoaderData() as { organization: Organization; orgJobs: JobsRes };
  const [jobList, setJobList] = useState<Array<Job>>(orgJobs.items);
  const [total, setTotal] = useState<number>(orgJobs.total_count);
  const [page, setPage] = useState(1);

  const PER_PAGE = 2;
  const isMobile = isTouchDevice();

  const getJobsData = async () => {
    const payload = {
      identity_id: organization?.id,
      page: page,
      limit: PER_PAGE,
      status: 'ACTIVE',
    };

    const res = await jobs(payload);
    if (isMobile && page > 1) {
      setJobList([...jobList, ...res.items]);
    } else setJobList([...res.items]);
    setTotal(res.total_count);
  };

  useEffect(() => {
    getJobsData();
  }, [page]);

  return {
    data: { page, PER_PAGE, isMobile, jobs: jobList, total },
    operations: { setPage },
  };
};
