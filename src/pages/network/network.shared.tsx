import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity } from 'src/core/api';
import { RootState } from 'src/store';

export const useNetworkShared = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  function navigateNetwork(path: string) {
    navigate(`/network/${path}`);
  }

  return {
    navigateNetwork,
    identity,
  };
};
