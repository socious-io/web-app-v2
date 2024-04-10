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
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';

export const useCredentialsList = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const verified = (currentIdentity?.meta as OrgMeta)?.verified;
  const { credentials } = useLoaderData() as { credentials: CredentialExperiencePaginateRes };
  const userProfile = currentIdentity?.type === 'users';
  const isMobile = isTouchDevice();
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

  const filteredRequested = (items: CredentialExperiencePaginateRes['items']) => {
    if (userProfile) {
      return items.filter(item => item.status === 'PENDING' || item.status === 'REJECTED');
    } else {
      return items.filter(item => item.status !== 'ISSUED');
    }
  };
  const [credentialsList, setCredentialsList] = useState(filteredRequested(credentials.items));

  const fetchMore = async (page: number, reload = false) => {
    const data = await getRequestedVerifyExperiences({ page, limit: 10 });
    const filteredRequestedData = filteredRequested(data.items);
    if (isMobile && page > 1 && !reload) setCredentialsList([...credentialsList, ...filteredRequestedData]);
    else setCredentialsList(filteredRequestedData);
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
    verified,
    userProfile,
    onUpdateExperience,
    avatarInfo,
    selectedCredential,
    onSelectCredential,
  };
};
