import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
// import { useSignInForm } from 'src/modules/Auth/containers/signin/SignInForm/useSignInForm';

export const useAllowNotification = () => {
  const type = localStorage.getItem('registerFor');
  const { state } = useLocation();
  const { username } = state || '';
  // const { registerPushNotifications } = useSignInForm('');
  const filter = localStorage.getItem('filter');
  const { events } = filter ? (JSON.parse(filter) as { events: string[] }) : { events: [] };
  const navigate = useNavigate();

  const onAllowNotification = async () => {
    // await registerPushNotifications();
    onSkip();
  };
  const onSkip = () => {
    localStorage.removeItem('registerFor');
    if (events.length) {
      navigate('/search?q=&type=users&page=1');
    } else {
      navigate('/dashboard/user');
    }
  };
  const items = [
    {
      iconName: 'log-out-01',
      label: 'Log out',
      onClick: () => {
        logout().then(() => {
          localStorage.clear();
          nonPermanentStorage.clear();
          navigate('/intro');
        });
      },
    },
  ];
  return { onAllowNotification, items, onSkip };
};
