import { useState } from 'react';
import { getJobList } from './jobs.services';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { useSelector } from 'react-redux';

export const useJobsShared = () => {
  const { data } = useMatch();
  const navigate = useNavigate();
  const [jobList, setJobList] = useState(data.items);
  const [page, setPage] = useState(1);

  function onMorePage() {
    getJobList({ page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setJobList((list) => [...list, ...resp.items]);
    });
  }

  function navigateToProfile() {
    if (identity.type === 'users') {
      navigate({ to: `/profile/users/${identity.meta.username}/view` });
    } else {
      navigate({ to: `/profile/organizations/${identity.meta.shortname}/view` });
    }
  }

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const name = identity.meta.name;
  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  return { onMorePage, jobList, avatarImg, identity, name, navigateToProfile };
};
