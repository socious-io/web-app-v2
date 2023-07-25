import { useState } from 'react';
import { getJobList } from './jobs.services';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { useSelector } from 'react-redux';

export const useJobsShared = () => {
  const { data } = useMatch();
  const [jobList, setJobList] = useState(data.items);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const identity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  function onMorePage() {
    getJobList({ page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setJobList((list) => [...list, ...resp.items]);
    });
  }

  function goToJobDetail(id: string) {
    navigate({ to: `/jobs/${id}` });
  }

  const showMorePageBtn = jobList.length < data.total_count;

  return { onMorePage, jobList, identity, goToJobDetail, showMorePageBtn };
};
