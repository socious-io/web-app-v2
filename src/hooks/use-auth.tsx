import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { RootState } from 'src/store';

export const useAuth = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
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
