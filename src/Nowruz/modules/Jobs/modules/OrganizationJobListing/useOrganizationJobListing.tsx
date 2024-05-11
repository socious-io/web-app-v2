import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CurrentIdentity, JobsRes, jobs } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { ButtonGroupItem } from 'src/Nowruz/modules/general/components/ButtonGroups/buttonGroups.types';
import { RootState } from 'src/store';

export const useOrganizationJobListing = () => {
  const loaderData = useLoaderData() as JobsRes;
  const [jobsList, setJobsList] = useState(loaderData.items);
  const [total, setTotal] = useState<number>(loaderData.total_count);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'archived'>('all');
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const navigate = useNavigate();

  const getJobsData = async () => {
    setLoading(true);
    const payload = {
      identity_id: currentIdentity?.id,
      page: page,
      limit: 5,
    };
    if (filter === 'archived') payload.status = 'EXPIRE';
    const res = await jobs(payload);
    if (isMobile && page > 1) {
      setJobsList([...jobsList, ...res.items]);
    } else setJobsList([...res.items]);
    setTotal(res.total_count);
    setLoading(false);
  };

  const PER_PAGE = 5;
  const isMobile = isTouchDevice();
  const pageNumber = Number(loaderData.page);
  const [page, setPage] = useState(pageNumber);

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
    localStorage.setItem('page', page.toString());
    getJobsData();
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
  };
};
