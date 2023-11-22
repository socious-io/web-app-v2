import { useNavigate } from 'react-router-dom';
import { useSignInForm } from 'src/Nowruz/modules/Auth/containers/signin/SignInForm/useSignInForm';
import { logout } from 'src/pages/sidebar/sidebar.service';

export const useAllowNotification = () => {
  const { registerPushNotifications } = useSignInForm();
  const navigate = useNavigate();

  const onAllowNotification = async () => {
    await registerPushNotifications();

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
  return { onAllowNotification, items };
};
