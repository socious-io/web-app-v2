import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentIdentity,
  Education,
  Organization,
  User,
  claimEducationVC,
  getOrganization,
  otherProfileByUsername,
  removeEducations,
  requestVerifyEducation,
} from 'src/core/api';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useEducation = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const user = useSelector<RootState, User | Organization | undefined>(state => state.profile.identity) as User;
  const [openModal, setOpenModal] = useState<{ name: 'add' | 'edit' | 'verify' | 'claim'; open: boolean }>({
    name: 'add',
    open: false,
  });
  const [education, setEducation] = useState<Education>();
  const [org, setOrg] = useState<Organization>();
  const [openCertificate, setOpenCertificate] = useState(false);
  const [disabledClaims, setDisabledClaims] = useState<{ [key: string]: boolean }>({});
  const [credentialId, setCredentialId] = useState('');
  const isVerified = (user as User).identity_verified;
  const myProfile = currentIdentity?.id === user?.id;
  const dispatch = useDispatch();

  const getDegree = (item: Education) => {
    if (!item) return '';
    return `${item.degree}, ${item.title}`;
  };

  const handleClose = () => {
    setOpenModal({ ...openModal, open: false });
  };

  const handleEdit = (ex: Education) => {
    setEducation(ex);
    setOpenModal({ name: 'edit', open: true });
  };

  const handleAdd = () => {
    setEducation(undefined);
    setOpenModal({ name: 'add', open: true });
  };

  const handleDelete = async (id: string) => {
    await removeEducations(id);

    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
  };

  const onOpenVerifyModal = async (ed: Education) => {
    const res = await getOrganization(ed.org.id);
    setOrg(res);
    setEducation(ed);
    setOpenModal({ name: 'verify', open: true });
  };

  const handleRequestVerify = async (id: string, message?: string, exact_info?: boolean) => {
    try {
      await requestVerifyEducation(id, message, exact_info);
      const updated = await otherProfileByUsername(user?.username || '');
      dispatch(setIdentity(updated));
      dispatch(setIdentityType('users'));
    } catch (e) {
      console.log('error in verifying education:', e);
    }
  };

  const onOpenClaimModal = (id?: string) => {
    if (!id) return;
    setCredentialId(id);
    setDisabledClaims(prevState => ({
      ...prevState,
      [id]: true,
    }));
    setOpenModal({ name: 'claim', open: true });
  };

  const handleClaimVC = async () => {
    const { url } = await claimEducationVC(credentialId);
    window.open(url, '_blank');
  };

  return {
    openModal,
    handleClose,
    myProfile,
    user,
    handleAdd,
    handleEdit,
    handleDelete,
    education,
    getDegree,
    isVerified,
    onOpenVerifyModal,
    openCertificate,
    setOpenCertificate,
    org,
    handleRequestVerify,
    onOpenClaimModal,
    credentialId,
    disabledClaims,
    handleClaimVC,
  };
};
