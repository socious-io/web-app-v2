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
} from 'src/core/api';
import { monthShortNames } from 'src/core/time';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';
import { requestVerifyExperience } from 'src/core/api';

export const useExperience = () => {
  const user = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  }) as User;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;
  const userVerified = (currentIdentity?.meta as UserMeta)?.identity_verified;

  const [openModal, setOpenModal] = useState(false);
  const [experience, setExperience] = useState<Experience>();
  const [disabledClaims, setDisabledClaims] = useState<{ [key: string]: boolean }>({});
  const [reqModelShow, setReqModelShow] = useState(false);
  const [openClaimModal, setOpenClaimModal] = useState(false);
  const [credentialId, setCredentialId] = useState('');
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModal(false);
    setReqModelShow(false);
  };

  const handleEdit = (ex: Experience) => {
    setExperience(ex);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setExperience(undefined);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    await removeExperiences(id);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
  };

  const getStringDate = (date: string) => {
    const dateFormat = new Date(date);
    const month = monthShortNames[dateFormat.getMonth()];
    const year = dateFormat.getFullYear().toString();
    return `${month} ${year}`;
  };

  const handleRequestVerify = (id: string) => async () => {
    await requestVerifyExperience(id);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
    setReqModelShow(true);
  };

  const handleOpenClaimModal = (id?: string) => {
    if (!id) return;
    setCredentialId(id);
    setDisabledClaims(prevState => ({
      ...prevState,
      [id]: true,
    }));
    setOpenClaimModal(true);
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
    handleRequestVerify,
    disabledClaims,
    reqModelShow,
    userVerified,
    openClaimModal,
    setOpenClaimModal,
    handleOpenClaimModal,
    credentialId,
  };
};
