import { useMatch, useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { Job } from 'src/components/organisms/job-list/job-list.types';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';

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
  const { data: job } = useMatch() as unknown as { data: Job };

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  function onApply() {
    navigate({ to: './apply' });
  }

  const userIdentity = getUserData(identity);

  return { navigate, job, userIdentity, identity, onApply };
};
