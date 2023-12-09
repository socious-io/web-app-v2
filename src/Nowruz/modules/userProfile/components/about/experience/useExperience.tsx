import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentIdentity, Experience, User, otherProfileByUsername, removeExperiences } from 'src/core/api';
import { monthNames } from 'src/core/time';
import { RootState } from 'src/store';
import { setUser } from 'src/store/reducers/profile.reducer';

export const useExperience = () => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;

  const [openModal, setOpenModal] = useState(false);
  const [experience, setExperience] = useState<Experience>();

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModal(false);
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
    dispatch(setUser(updated));
  };

  const getStringDate = (date: string) => {
    const dateFormat = new Date(date);
    const month = monthNames[dateFormat.getMonth()];
    const year = dateFormat.getFullYear().toString();
    return `${month} ${year}`;
  };

  return { user, myProfile, openModal, experience, handleEdit, handleAdd, handleDelete, getStringDate, handleClose };
};
