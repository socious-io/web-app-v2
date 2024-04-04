import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  getRequestedVerifyExperiences,
  CredentialExperiencePaginateRes,
  approveVerifyExperience,
  rejectVerifyExperience,
  Experience,
  CredentialExperienceRes,
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useCredentialsList = () => {
  const { credentials } = useLoaderData() as { credentials: CredentialExperiencePaginateRes };
  const [credentialsList, setCredentialsList] = useState(credentials.items);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [experience, setExperience] = useState<Experience>();
  const [avatarInfo, setAvatarInfo] = useState<{
    url: string;
    first_name: string;
    last_name: string;
    username: string;
  } | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<string>('');
  const totalPage = Math.ceil(credentials?.total_count / credentials?.limit) || 1;

  const isMobile = isTouchDevice();

  const fetchMore = async (page: number, reload = false) => {
    const data = await getRequestedVerifyExperiences({ page, limit: 10 });
    if (isMobile && page > 1 && !reload) setCredentialsList([...credentialsList, ...data.items]);
    else setCredentialsList(data.items);
  };

  useEffect(() => {
    fetchMore(page);
  }, [page]);

  const onApprove = async (id: string) => {
    try {
      await approveVerifyExperience(id);
      await fetchMore(page, true);
      setSelectedCredential('');
    } catch (e) {
      console.log('error in approving credential:', e);
    }
  };

  const onReject = async (id: string) => {
    try {
      await rejectVerifyExperience(id);
      await fetchMore(page, true);
    } catch (e) {
      console.log('error in rejecting credential:', e);
    }
  };

  const onView = (credential: CredentialExperienceRes) => {
    setOpenModal(true);
    setAvatarInfo({
      url: credential.avatar?.url || '',
      first_name: credential.user.first_name || '',
      last_name: credential.user.last_name || '',
      username: credential.user.username || '',
    });
    setExperience({
      ...credential.experience,
      org: credential.org,
      credential: { ...credential },
    });
  };

  const onUpdateExperience = (updatedExperience: Experience) => {
    const filteredExperience = credentialsList.map(list =>
      list.experience.id === updatedExperience.id
        ? {
            ...list,
            experience: { ...list.experience, ...updatedExperience },
          }
        : list,
    );
    const updatedList = filteredExperience.find(list => list.experience.id === updatedExperience.id);
    updatedList?.org && setExperience({ ...updatedExperience, org: updatedList.org });
    setCredentialsList(filteredExperience);
  };

  const onSelectCredential = (id: string) => {
    //FIXME: for now because bulk action is out of scope of this PR
    if (selectedCredential === id) {
      setSelectedCredential('');
    } else {
      setSelectedCredential(id);
    }
  };

  return {
    credentialsList,
    setCredentialsList,
    totalPage,
    isMobile,
    setPage,
    onApprove,
    onReject,
    onView,
    setOpenModal,
    openModal,
    experience,
    onUpdateExperience,
    avatarInfo,
    selectedCredential,
    onSelectCredential,
  };
};
