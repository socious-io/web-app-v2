import { useMatch, useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { Resolver } from './job-detail.types';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';

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

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  const location = `${job.identity_meta.city}, ${getCountryName(
    job.identity_meta.country as keyof typeof COUNTRIES_DICT | undefined
  )}`;

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const userIdentity = getUserData(identity);

  return { navigate, job, userIdentity, identity, location };
};
