import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentIdentity, Organization, User, otherProfileByUsername } from 'src/core/api';
import { removeAdditional } from 'src/core/api/additionals/additionals.api';
import { AdditionalRes, EducationMeta } from 'src/core/api/additionals/additionals.types';
import { monthShortNames } from 'src/core/time';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useEducation = () => {
  const [openModal, setOpenModal] = useState(false);
  const [education, setEducation] = useState<AdditionalRes>();
  const user = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  }) as User;

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;
  const dispatch = useDispatch();

  const getDateText = (item: AdditionalRes) => {
    const meta = item.meta as EducationMeta;
    let txt = '';
    if (meta.start_month) txt = txt.concat(monthShortNames[Number(meta.start_month)]);
    if (meta.start_year) txt = txt.concat(` ${meta.start_year} -`);
    if (meta.end_month) txt = txt.concat(` ${monthShortNames[Number(meta.end_month)]}`);
    if (meta.end_year) txt = txt.concat(` ${meta.end_year}`);
    return txt;
  };

  const getDegree = (item: AdditionalRes) => {
    const meta = item.meta as EducationMeta;
    return `${meta.degree} ${meta.degree && meta.field ? 'of' : ''} ${meta.field}`;
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
    await removeAdditional(id);

    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
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
    setEducation,
  };
};
