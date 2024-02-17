import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CurrentIdentity,
  Identity,
  OrgMeta,
  UserMeta,
  notifications,
  Notification,
  readAllNotifications,
} from 'src/core/api';
import { openToVolunteer as openToVolunteerApi, openToWork as openToWorkApi, hiring as hiringApi } from 'src/core/api';
import { RootState } from 'src/store';

export const useHeaderNavBar = () => {
  const navigate = useNavigate();
  const identities = useSelector<RootState, Identity[]>((state) => {
    return state.identity.entities;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((i) => i.current);
  });

  const userIsLoggedIn = !!currentIdentity;

  const [userType, setUserType] = useState<'users' | 'organizations'>('users');
  const [hiring, setHiring] = useState(false);
  const [openToWork, setOpenToWork] = useState(false);
  const [openToVolunteer, setOpenToVolunteer] = useState(false);
  const [image, setImage] = useState('');
  const [openNotifPanel, setOpenNotifPanel] = useState(false);
  const [notifList, setNotifList] = useState<Notification[]>();
  const [unreadNotif, setUnreadNotif] = useState(false);
  const getNotification = async () => {
    const res = await notifications({ page: 1, limit: 50 });
    setNotifList(res.items);
    const unread = res.items.find((notif) => !notif.read_at);
    if (unread) setUnreadNotif(true);
  };

  useEffect(() => {
    if (currentIdentity) {
      setUserType(currentIdentity.type);
      setImage((currentIdentity.meta as UserMeta).avatar || (currentIdentity.meta as OrgMeta).image || '');
      if (currentIdentity.type === 'users') {
        setOpenToWork((currentIdentity.meta as UserMeta).open_to_work);
        setOpenToVolunteer((currentIdentity.meta as UserMeta).open_to_volunteer);
      } else {
        setHiring((currentIdentity.meta as OrgMeta).hiring);
      }
      getNotification();
    }
  }, [currentIdentity]);

  const accounts = identities.map((i) => {
    const user = i.meta as UserMeta;
    const org = i.meta as OrgMeta;
    return {
      id: i.id,
      img: user.avatar || org.image || '',
      type: i.type,
      name: user.name || org.name,
      username: user.username || org.shortname,
      selected: user.id === currentIdentity?.id,
    };
  });

  const handleOpenToWork = async () => {
    const res = await openToWorkApi();
    setOpenToWork(res);
  };

  const handleOpenToVolunteer = async () => {
    const res = await openToVolunteerApi();
    setOpenToVolunteer(res);
  };
  const handleHiring = async () => {
    const res = await hiringApi();
    setHiring(res);
  };

  const navigateToProfile = () => {
    const username = (currentIdentity?.meta as UserMeta).username || (currentIdentity?.meta as OrgMeta).shortname;
    const type = currentIdentity?.type;
    if (username) {
      if (type === 'users') navigate(`profile/users/${username}/view`);
      else navigate(`profile/organizations/${username}/view`);
    }
  };

  const navigateToSettings =() => {
    navigate('/nowruz/settings');
  };

  const readNotifications = async () => {
    setOpenNotifPanel(true);
    setUnreadNotif(false);
    await readAllNotifications();
  };
  return {
    userIsLoggedIn,
    userType,
    image,
    accounts,
    openToVolunteer,
    openToWork,
    hiring,
    handleOpenToWork,
    handleOpenToVolunteer,
    handleHiring,
    openNotifPanel,
    setOpenNotifPanel,
    notifList,
    navigateToProfile,
    unreadNotif,
    readNotifications,
    navigateToSettings
  };
};
