import { useLocation, useNavigate } from 'react-router-dom';
import { useSignInForm } from 'src/Nowruz/modules/Auth/containers/signin/SignInForm/useSignInForm';
import { logout } from 'src/pages/sidebar/sidebar.service';

export const useAllowNotification = () => {
  const type = localStorage.getItem('registerFor');
  const { state } = useLocation();
  const { username } = state || '';
  const { registerPushNotifications } = useSignInForm();
  const navigate = useNavigate();

  const onAllowNotification = async () => {
    await registerPushNotifications();
    onSkip();
  };
  const onSkip = () => {
    localStorage.removeItem('registerFor');
    if (type === 'user') navigate(`/profile/users/${username}/view`);
    else if (type === 'organization') navigate(`/profile/organizations/${username}/view`);
    else navigate('/jobs');
  };
  const items = [
    {
      iconName: 'log-out-01',
      label: 'Log out',
      onClick: () => {
        logout().then(() => {
          navigate('/intro');
        });
      },
    },
  ];
  return { onAllowNotification, items, onSkip };
};
