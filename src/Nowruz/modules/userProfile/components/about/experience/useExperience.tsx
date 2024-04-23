import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentIdentity,
  Experience,
  Organization,
  User,
  UserMeta,
  claimExperienceVC,
  otherProfileByUsername,
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
  const dispatch = useDispatch();

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
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
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
      const updated = await otherProfileByUsername(user?.username || '');
      dispatch(setIdentity(updated));
      dispatch(setIdentityType('users'));
      setReqModelShow(true);
    } catch (e) {
      console.log('error in verifying experiece:', e);
    }
  };

  const handleOpenClaimModal = (id?: string) => {
    if (!id) return;
    setCredentialId(id);
    setDisabledClaims(prevState => ({
      ...prevState,
      [id]: true,
    }));
    setOpenModal({ name: 'claim', open: true });
  };

  const handleClaimVC = async () => {
    const { url } = await claimExperienceVC(credentialId);
    window.open(url, '_blank');
  };

  return {
    user,
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
  };
};
