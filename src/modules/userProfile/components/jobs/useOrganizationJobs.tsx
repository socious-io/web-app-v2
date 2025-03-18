import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CurrentIdentity, Job, JobsRes, Organization, jobs } from 'src/core/api';
import { RootState } from 'src/store';

export const useOrganizationJobs = () => {
  const navigate = useNavigate();
  const { organization, orgJobs } = useLoaderData() as { organization: Organization; orgJobs: JobsRes };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const [jobList, setJobList] = useState<Array<Job>>(orgJobs.items);
  const [total, setTotal] = useState<number>(orgJobs.total_count);
  const [page, setPage] = useState(Number(orgJobs.page));
  const PER_PAGE = 4;
  const myProfile = currentIdentity?.id === organization?.id;

  const getJobsData = async () => {
    const payload = {
      identity_id: organization?.id,
      page: page,
      limit: PER_PAGE,
      status: 'ACTIVE',
    };

    const res = await jobs(payload);
    setJobList(res.items);
    setTotal(res.total_count);
  };

  useEffect(() => {
    localStorage.setItem('profileJobPage', page.toString());
    getJobsData();
  }, [page]);

  const onCreateJob = () => navigate('/jobs/create');

  return {
    data: { jobs: jobList, total, page, PER_PAGE, myProfile },
    operations: { setPage, onCreateJob },
  };
};
