import { useSelector } from 'react-redux';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store';

export const useAuth = () => {
  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const isLoggedIn = !!currentIdentity;

  function showIfLoggedIn(jsx: React.ReactNode) {
    if (currentIdentity) {
      return jsx;
    } else {
      return null;
    }
  }

  return { showIfLoggedIn, isLoggedIn };
};
