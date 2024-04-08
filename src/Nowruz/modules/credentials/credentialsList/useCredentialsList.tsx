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
  const PER_PAGE = 10;
  // const verified = (currentIdentity?.meta as OrgMeta)?.verified;
  const verified = true;
  const { credentials } = useLoaderData() as { credentials: CredentialExperiencePaginateRes };
  const [credentialsList, setCredentialsList] = useState(credentials.items);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [experience, setExperience] = useState<Experience>();

  const isMobile = isTouchDevice();
  const userProfile = currentIdentity?.type === 'users';

  const fetchMore = async (page: number, reload = false) => {
    const data = await getRequestedVerifyExperiences({ page, limit: 10 });
    if (isMobile && page > 1 && !reload) setCredentialsList([...credentialsList, ...data.items]);
    else setCredentialsList(data.items);
  };

  useEffect(() => {
    fetchMore(page);
  }, [page]);

  const onApprove = async (id: string) => {
    await approveVerifyExperience(id);
    await fetchMore(page, true);
  };

  const onReject = async (id: string) => {
    await rejectVerifyExperience(id);
    await fetchMore(page, true);
  };

  const onDetails = (credential: CredentialExperienceRes) => {
    setOpenModal(true);
    setExperience({
      ...credential.experience,
      org: credential.org,
    });
  };

  return {
    credentialsList,
    page,
    total: credentials.total_count,
    isMobile,
    setPage,
    onApprove,
    onReject,
    onDetails,
    setOpenModal,
    openModal,
    experience,
    verified,
    userProfile,
    PER_PAGE,
  };
};
