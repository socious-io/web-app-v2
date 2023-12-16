import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, OrgMeta, User } from 'src/core/api';
import { AdditionalRes, EducationMeta } from 'src/core/api/additionals/additionals.types';
import { RootState } from 'src/store';

export const useEducation = () => {
  const [openModal, setOpenModal] = useState(false);
  const [education, setEducation] = useState<AdditionalRes>();
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;

  const getDateText = (item: AdditionalRes) => {
    const meta = item.meta as EducationMeta;
    let txt = meta.start_month || '';
    if (meta.start_year) txt = txt.concat(` ${meta.start_year} -`);
    if (meta.end_month) txt = txt.concat(` ${meta.end_month}`);
    if (meta.end_year) txt = txt.concat(` ${meta.end_year}`);
    return txt;
  };

  const getDegree = (item: AdditionalRes) => {
    const meta = item.meta as EducationMeta;
    return `${meta.degree} in ${meta.field}`;
  };

  const getSchool = (item: AdditionalRes) => {
    const meta = item.meta as EducationMeta;
    let res = `${meta.school_name}`;
    if (meta.school_city) res = res.concat(`, ${meta.school_city}`);
    return res;
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleEdit = (ex: AdditionalRes) => {
    setEducation(ex);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setEducation(undefined);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    // await removeExperiences(id);
    // const updated = await otherProfileByUsername(user?.username || '');
    // dispatch(setUser(updated));
  };

  return {
    openModal,
    handleClose,
    myProfile,
    getDateText,
    user,
    handleAdd,
    handleEdit,
    handleDelete,
    education,
    getDegree,
    getSchool,
  };
};
