import { useNavigate } from 'react-router-dom';
import { logout } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

export const useAllowNotification = () => {
  const navigate = useNavigate();
  const filter = localStorage.getItem('filter');
  const { events } = filter ? (JSON.parse(filter) as { events: string[] }) : { events: [] };

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

  const onSkip = () => {
    localStorage.removeItem('registerFor');
    if (events.length) {
      navigate('/search?q=&type=users&page=1');
    } else {
      navigate('/dashboard/user');
    }
  };

  return { onAllowNotification: onSkip, items, onSkip };
};
