import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store';

export const useNetworkShared = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  function navigateNetwork(path: string) {
    navigate(`/network/${path}`);
  }

  return {
    navigateNetwork,
    identity,
  };
};
