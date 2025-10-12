import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUsernameAdaptor } from 'src/core/adaptors';
import {
  CurrentIdentity,
  Experience,
  Organization,
  User,
  UserMeta,
  claimExperienceVC,
  removeExperiences,
  requestVerifyExperience,
} from 'src/core/api';
import { getUTCDate, monthShortNames } from 'src/core/time';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useExperience = () => {
  const user = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  }) as User;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;
  const userVerified = (currentIdentity?.meta as UserMeta)?.identity_verified;

  const [openModal, setOpenModal] = useState<{ name: 'add' | 'edit' | 'verify' | 'claim'; open: boolean }>({
    name: 'add',
    open: false,
  });
  const [experience, setExperience] = useState<Experience>();
  const [disabledClaims, setDisabledClaims] = useState<{ [key: string]: boolean }>({});
  const [reqModelShow, setReqModelShow] = useState(false);
  const [credentialId, setCredentialId] = useState('');
  const [claimUrl, setClaimUrl] = useState('');
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const MAX_EXPERIENCES = 5;
  const userExperiences = showAll ? user?.experiences : user?.experiences?.slice(0, MAX_EXPERIENCES);
  const hasMoreExperiences = (user?.experiences || []).length > MAX_EXPERIENCES;

  const handleClose = () => {
    setOpenModal({ ...openModal, open: false });
    setReqModelShow(false);
  };

  const handleEdit = (ex: Experience) => {
    setExperience(ex);
    setOpenModal({ name: 'edit', open: true });
  };

  const handleAdd = () => {
    setExperience(undefined);
    setOpenModal({ name: 'add', open: true });
  };

  const handleDelete = async (id: string) => {
    await removeExperiences(id);
    if (!user?.username) return;
    const { data: updatedUser } = await getUserByUsernameAdaptor(user.username);
    dispatch(setIdentity(updatedUser));
    dispatch(setIdentityType('users'));
  };

  const getStringDate = (date: string) => {
    const dateFormat = new Date(getUTCDate(date));
    const month = monthShortNames[dateFormat.getMonth()];
    const year = dateFormat.getFullYear().toString();
    return `${month} ${year}`;
  };

  const onOpenVerifyModal = (ex: Experience) => {
    setExperience(ex);
    setOpenModal({ name: 'verify', open: true });
  };

  const handleRequestVerify = async (id: string, message?: string, exact_info?: boolean) => {
    try {
      await requestVerifyExperience(id, message, exact_info);
      if (!user?.username) return;
      const { data: updatedUser } = await getUserByUsernameAdaptor(user.username);
      dispatch(setIdentity(updatedUser));
      dispatch(setIdentityType('users'));
      setReqModelShow(true);
    } catch (e) {
      console.log('error in verifying experiece:', e);
    }
  };

  const handleOpenClaimModal = async (id?: string) => {
    if (!id) return;
    setCredentialId(id);
    setDisabledClaims(prevState => ({
      ...prevState,
      [id]: true,
    }));
    try {
      const { short_url } = await claimExperienceVC(id);
      setClaimUrl(short_url);
    } catch (error) {
      console.log('error in claiming experience VC', error);
    }
    setOpenModal({ name: 'claim', open: true });
  };

  const handleClaimVC = () => {
    window.open(claimUrl, '_blank');
  };

  return {
    userExperiences,
    hasMoreExperiences,
    myProfile,
    openModal,
    experience,
    handleEdit,
    handleAdd,
    handleDelete,
    getStringDate,
    handleClose,
    onOpenVerifyModal,
    handleRequestVerify,
    disabledClaims,
    reqModelShow,
    userVerified,
    handleOpenClaimModal,
    handleClaimVC,
    claimUrl,
    showAll,
    setShowAll,
  };
};
