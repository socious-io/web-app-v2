import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentIdentity, Organization, User, otherProfileByUsername } from 'src/core/api';
import { removeAdditional } from 'src/core/api/additionals/additionals.api';
import { AdditionalRes, CertificateMeta, EducationMeta } from 'src/core/api/additionals/additionals.types';
import { monthShortNames } from 'src/core/time';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useCertificate = () => {
  const [openModal, setOpenModal] = useState(false);
  const [certificate, setCertificate] = useState<AdditionalRes>();
  const user = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  }) as User;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;
  const dispatch = useDispatch();

  const getDateText = (item: AdditionalRes) => {
    const meta = item.meta as CertificateMeta;
    let txt = '';
    if (meta.issue_month) txt = txt.concat(monthShortNames[Number(meta.issue_month)]);
    if (meta.issue_year) txt = txt.concat(` ${meta.issue_year}`);
    if (txt) txt = 'Issued '.concat(txt);
    return txt;
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

  const handleEdit = (cert: AdditionalRes) => {
    setCertificate(cert);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setCertificate(undefined);
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
    certificate,
    setCertificate,
    getSchool,
  };
};
