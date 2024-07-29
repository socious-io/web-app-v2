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

  type Filter = 'all' | 'archived' | 'active';

  const [searchParam] = useSearchParams();
  const [filter, setFilter] = useState<Filter>((searchParam.get('filter') as Filter) || 'all');
  const pageNumber = Number(searchParam.get('page') || 1);
  const [page, setPage] = useState(pageNumber);

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const navigate = useNavigate();

  const getJobsData = async () => {
    setLoading(true);
    try {
      const payload: FilterReq = {
        identity_id: currentIdentity?.id,
        page: page,
        limit: 5,
      };
      if (filter === 'archived') payload.status = 'EXPIRE';
      else if (filter === 'active') payload.status = 'ACTIVE';
      const res = await jobs(payload);
      setJobsList([...res.items]);
      setTotal(res.total_count);
    } catch (e) {
      console.log('error in fetching created jobs', e);
    }
    setLoading(false);
  };

  const PER_PAGE = 5;
  const isMobile = isTouchDevice();

  const handleClick = (filter: 'all' | 'active' | 'archived') => {
    setFilter(filter);
    setPage(1);
  };

  const filterButtons: ButtonGroupItem[] = [
    {
      label: 'View all',
      value: 'all',
      handleClick: () => handleClick('all'),
    },
    {
      label: 'Active',
      value: 'active',
      handleClick: () => handleClick('active'),
    },
    {
      label: 'Archived',
      value: 'archived',
      handleClick: () => handleClick('archived'),
    },
  ];

  const navigateToCreateJob = () => {
    navigate('../create');
  };

  useEffect(() => {
    getJobsData();
    if (page !== pageNumber) navigate(`/jobs/created?page=${page}&filter=${filter}`);
  }, [page, filter]);

  const activeIndex = filterButtons.findIndex(btn => btn.value === filter);

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
    activeIndex,
  };
};
