import { useEffect, useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { useSelector } from 'react-redux';
import { getOrganizationJobs } from './jobs-index.service';

export const useJobsIndexShared = () => {
  const { data } = useMatch();
  const [jobList, setJobList] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizationJobs({ identityId: data.user.id, page: pagination.page }).then((resp) => {
      setJobList((list) => [...list, ...resp.items]);
      setPagination({ ...pagination, total: resp.total_count });
    });
  }, []);

  function onMorePage() {
    getOrganizationJobs({ identityId: data.user.id, page: pagination.page + 1 }).then((resp) => {
      setPagination((v) => ({ ...pagination, page: pagination.page + 1 }));
      setJobList((list) => [...list, ...resp.items]);
    });
  }

  function goToJobDetail(id: string) {
    navigate({ to: `/jobs/${id}` });
  }

  const showMorePageBtn = jobList.length < pagination.total;

  return { jobList, goToJobDetail, data, showMorePageBtn, onMorePage };
};
