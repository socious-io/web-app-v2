import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { JobsRes } from 'src/core/api';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';

import { getJobList } from './jobs.services';

interface Loader {
  data: JobsRes;
}
export const useJobsShared = () => {
  const { data } = useLoaderData() as Loader;
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
    navigate(`/jobs/${id}`);
  }

  const showMorePageBtn = jobList.length < data.total_count;

  return { onMorePage, jobList, identity, goToJobDetail, showMorePageBtn };
};
