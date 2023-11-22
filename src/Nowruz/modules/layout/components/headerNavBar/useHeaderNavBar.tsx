import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, Identity, OrgMeta, UserMeta } from 'src/core/api';
import { openToVolunteer as openToVolunteerApi, openToWork as openToWorkApi, hiring as hiringApi } from 'src/core/api';
import { RootState } from 'src/store';

export const useHeaderNavBar = () => {
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
  };
};
