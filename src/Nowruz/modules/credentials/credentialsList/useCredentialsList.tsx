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
  };
};
