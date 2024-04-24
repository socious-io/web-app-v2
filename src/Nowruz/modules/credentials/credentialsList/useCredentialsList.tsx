import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import {
  getRequestedVerifyExperiences,
  CredentialExperiencePaginateRes,
  approveVerifyExperience,
  rejectVerifyExperience,
  Experience,
  CredentialExperienceRes,
  CurrentIdentity,
  OrgMeta,
  CredentialEducationPaginateRes,
  getRequestedVerifyEducations,
  CredentialEducationRes,
  Education,
  approveVerifyEducation,
  UserMeta,
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';

export const useCredentialsList = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const { credentials } = useLoaderData() as {
    credentials: CredentialExperiencePaginateRes | CredentialEducationPaginateRes;
  };
  const userProfile = currentIdentity?.type === 'users';
  const verified = userProfile
    ? (currentIdentity?.meta as UserMeta)?.identity_verified
    : (currentIdentity?.meta as OrgMeta)?.verified;
  const isMobile = isTouchDevice();
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState<{ name: 'experience' | 'education'; open: boolean }>({
    name: 'experience',
    open: false,
  });
  const [experience, setExperience] = useState<Experience>();
  const [education, setEducation] = useState<Education>();
  const [avatarInfo, setAvatarInfo] = useState<{
    url: string;
    first_name: string;
    last_name: string;
    username: string;
  } | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<{ name: 'experience' | 'education'; id: string }>({
    name: 'experience',
    id: '',
  });
  const totalPage = Math.ceil(credentials?.total_count / credentials?.limit) || 1;

  const filteredRequested = (
    items: CredentialExperiencePaginateRes['items'] | CredentialEducationPaginateRes['items'],
  ) => {
    return items.filter(item => item.status === 'PENDING' || item.status === 'REJECTED');
  };
  const [credentialsList, setCredentialsList] = useState(filteredRequested(credentials.items));

  const fetchMore = async (page: number, reload = false) => {
    const experiences = await getRequestedVerifyExperiences({ page, limit: 10 });
    const educations = await getRequestedVerifyEducations({ page, limit: 10 });
    const data = {
      items: [...experiences.items, ...educations.items] as
        | CredentialExperiencePaginateRes['items']
        | CredentialEducationPaginateRes['items'],
      limit: 20,
      page,
      total_count: experiences.total_count + educations.total_count,
    };
    const filteredRequestedData = filteredRequested(data.items);
    if (isMobile && page > 1 && !reload) setCredentialsList([...credentialsList, ...filteredRequestedData]);
    else setCredentialsList(filteredRequestedData);
  };

  useEffect(() => {
    fetchMore(page);
  }, [page]);

  const onApprove = async (id: string, isExperience: boolean) => {
    try {
      isExperience ? await approveVerifyExperience(id) : await approveVerifyEducation(id);
      await fetchMore(page, true);
      setSelectedCredential({ ...selectedCredential, id: '' });
    } catch (e) {
      console.log('error in approving credential:', e);
    }
  };

  const onReject = async (id: string, isExperience: boolean) => {
    try {
      isExperience ? await rejectVerifyExperience(id) : await rejectVerifyExperience(id);
      await fetchMore(page, true);
      setSelectedCredential({ ...selectedCredential, id: '' });
    } catch (e) {
      console.log('error in rejecting credential:', e);
    }
  };

  const onView = (credential: CredentialExperienceRes | CredentialEducationRes, isExperience: boolean) => {
    setOpenModal({ name: isExperience ? 'experience' : 'education', open: true });
    setAvatarInfo({
      url: credential.avatar?.url || '',
      first_name: credential.user.first_name || '',
      last_name: credential.user.last_name || '',
      username: credential.user.username || '',
    });
    if (isExperience) {
      setExperience({
        ...(credential as CredentialExperienceRes).experience,
        org: credential.org,
        credential: { ...credential },
      });
    } else {
      setEducation({
        ...(credential as CredentialEducationRes).education,
        org: credential.org,
        credential: { ...credential },
      });
    }
  };

  const onUpdateExperience = (updatedExperience: Experience) => {
    const filteredExperience = (credentialsList as CredentialExperienceRes[]).map(list =>
      list.experience?.id === updatedExperience?.id
        ? {
            ...list,
            experience: { ...list.experience, ...updatedExperience },
          }
        : list,
    );
    const updatedList = filteredExperience.find(list => list.experience?.id === updatedExperience?.id);
    updatedList?.org && setExperience({ ...updatedExperience, org: updatedList.org });
    setCredentialsList(filteredExperience);
    experience?.credential && onApprove(experience?.credential.id, true);
  };

  const onUpdateEducation = (updatedEducation: Education) => {
    const filteredEducation = (credentialsList as CredentialEducationRes[]).map(list =>
      list.education?.id === updatedEducation?.id
        ? {
            ...list,
            education: { ...list.education, ...updatedEducation },
          }
        : list,
    );
    const updatedList = filteredEducation.find(list => list.education?.id === updatedEducation?.id);
    updatedList?.org && setEducation({ ...updatedEducation, org: updatedList.org });
    setCredentialsList(filteredEducation);
    education?.credential && onApprove(education?.credential.id, false);
  };

  const onSelectCredential = (id: string, isExperience: boolean) => {
    //FIXME: for now because bulk action is out of scope of this PR
    if (selectedCredential.id === id) {
      setSelectedCredential({ ...selectedCredential, id: '' });
    } else {
      setSelectedCredential({ name: isExperience ? 'experience' : 'education', id });
    }
  };

  const handleCloseModal = () => setOpenModal({ ...openModal, open: false });

  return {
    credentialsList,
    setCredentialsList,
    totalPage,
    isMobile,
    setPage,
    onApprove,
    onReject,
    onView,
    handleCloseModal,
    openModal,
    experience,
    education,
    verified,
    userProfile,
    onUpdateExperience,
    onUpdateEducation,
    avatarInfo,
    selectedCredential,
    onSelectCredential,
  };
};
