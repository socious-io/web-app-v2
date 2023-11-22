import { useLocation, useNavigate } from 'react-router-dom';
import { useSignInForm } from 'src/Nowruz/modules/Auth/containers/signin/SignInForm/useSignInForm';
import { logout } from 'src/pages/sidebar/sidebar.service';

export const useAllowNotification = () => {
  const type = localStorage.getItem('registerFor');
  const { state } = useLocation();
  console.log(state);
  const { username } = state;
  const { registerPushNotifications } = useSignInForm();
  const navigate = useNavigate();

  const onAllowNotification = async () => {
    await registerPushNotifications();
    onSkip();
  };
  const onSkip = () => {
    if (type === 'user') navigate(`/profile/users/${username}/view`);
    else navigate(`/profile/organizations/${username}/view`);
    localStorage.removeItem('registerFor');
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
