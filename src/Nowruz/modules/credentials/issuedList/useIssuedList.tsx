import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import {
  getRequestedVerifyExperiences,
  CredentialExperiencePaginateRes,
  CurrentIdentity,
  OrgMeta,
  claimExperienceVC,
  getRequestedVerifyEducations,
  CredentialEducationPaginateRes,
  claimEducationVC,
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';

export const useIssuedList = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const verified = (currentIdentity?.meta as OrgMeta)?.verified;
  const { credentials } = useLoaderData() as { credentials: CredentialExperiencePaginateRes };
  const userProfile = currentIdentity?.type === 'users';
  const isMobile = isTouchDevice();
  const [page, setPage] = useState(1);
  const [selectedCredential, setSelectedCredential] = useState<{ name: 'experience' | 'education'; id: string }>({
    name: 'experience',
    id: '',
  });
  const totalPage = Math.ceil(credentials?.total_count / credentials?.limit) || 1;

  const filteredIssued = (
    items: CredentialExperiencePaginateRes['items'] | CredentialEducationPaginateRes['items'],
  ) => {
    if (userProfile) {
      return items.filter(item => item.status === 'APPROVED' || item.status === 'CLAIMED');
    } else {
      return items.filter(item => item.status === 'ISSUED');
    }
  };
  const [issuedList, setIssuedList] = useState(filteredIssued(credentials.items));

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
    const filteredDataIssued = filteredIssued(data.items);
    if (isMobile && page > 1 && !reload) setIssuedList([...issuedList, ...filteredDataIssued]);
    else setIssuedList(filteredDataIssued);
  };

  useEffect(() => {
    fetchMore(page);
  }, [page]);

  const onSelectCredential = (id: string, isExperience: boolean) => {
    //FIXME: for now because bulk action is out of scope of this PR
    if (selectedCredential.id === id) {
      setSelectedCredential({ ...selectedCredential, id: '' });
    } else {
      setSelectedCredential({ name: isExperience ? 'experience' : 'education', id });
    }
  };

  const onClaim = async (id: string, isExperience: boolean) => {
    let currentUrl = '';
    if (isExperience) {
      const { url } = await claimExperienceVC(id);
      currentUrl = url;
    } else {
      const { url } = await claimEducationVC(id);
      currentUrl = url;
    }
    window.open(currentUrl, '_blank');
    setSelectedCredential({ ...selectedCredential, id: '' });
  };

  const onArchive = async (id: string, isExperience: boolean) => {
    return;
  };

  return {
    issuedList,
    setIssuedList,
    totalPage,
    isMobile,
    setPage,
    onArchive,
    verified,
    userProfile,
    selectedCredential,
    onSelectCredential,
    onClaim,
  };
};
