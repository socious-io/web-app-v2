import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { CurrentIdentity, FilterReq, Job, JobsRes, jobs } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { ButtonGroupItem } from 'src/modules/general/components/ButtonGroups/buttonGroups.types';
import { RootState } from 'src/store';

export const useOrganizationJobListing = () => {
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  type Filter = 'all' | 'archived';
  const [searchParam] = useSearchParams();
  const [filter, setFilter] = useState<Filter>((searchParam.get('filter') as Filter) || 'all');
  const pageNumber = Number(searchParam.get('page') || 1);
  const [page, setPage] = useState(pageNumber);

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const navigate = useNavigate();
  const PER_PAGE = 10;
  const isMobile = isTouchDevice();

  const getJobsData = async () => {
    setLoading(true);
    try {
      const payload: FilterReq = {
        identity_id: currentIdentity?.id,
        page: page,
        limit: PER_PAGE,
      };
      if (filter === 'archived') payload.status = 'EXPIRE';
      const res = await jobs(payload);
      setJobsList([...res.items]);
      setTotal(res.total_count);
    } catch (e) {
      console.log('error in fetching created jobs', e);
    }
    setLoading(false);
  };

  const filterButtons: ButtonGroupItem[] = [
    {
      label: 'View all',
      handleClick: () => {
        setFilter('all');
        setPage(1);
      },
    },
    {
      label: 'Archived',
      handleClick: () => {
        setFilter('archived');
        setPage(1);
      },
    },
  ];

  const navigateToCreateJob = () => {
    navigate('../create');
  };

  useEffect(() => {
    getJobsData();
    if (page !== pageNumber) navigate(`/jobs/created?page=${page}&filter=${filter}`);
  }, [page, filter]);

  return {
    filterButtons,
    page,
    setPage,
    jobsList,
    total: total,
    PER_PAGE,
    isMobile,
    loading,
    navigateToCreateJob,
    filter,
  };
};
