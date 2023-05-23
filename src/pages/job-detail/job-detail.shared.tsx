import { useMatch, useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { Resolver } from './job-detail.types';

function getUserData(identity: IdentityReq) {
  if (identity.type === 'users') {
    return {
      name: identity.meta.name,
      avatar: identity.meta.avatar,
    };
  } else {
    return {
      name: identity.meta.name,
      avatar: identity.meta.image,
    };
  }
}

export const useJobDetailShared = () => {
  const navigate = useNavigate();
  const { jobDetail: job } = useMatch().data as Resolver;

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const userIdentity = getUserData(identity);

  return { navigate, job, userIdentity, identity };
};
