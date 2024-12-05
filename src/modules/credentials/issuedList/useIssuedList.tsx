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
  UserMeta,
  CredentialStatus,
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { translate } from 'src/core/utils';
import { StatusProps } from 'src/modules/general/components/Status/index.types';
import { RootState } from 'src/store';

export const useIssuedList = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );
  const { credentials } = useLoaderData() as { credentials: CredentialExperiencePaginateRes };
  const userProfile = currentIdentity?.type === 'users';
  const verified = userProfile
    ? (currentIdentity?.meta as UserMeta)?.identity_verified
    : (currentIdentity?.meta as OrgMeta)?.verified;
  const isMobile = isTouchDevice();
  const [page, setPage] = useState(1);
  const [selectedCredential, setSelectedCredential] = useState<{ name: 'experience' | 'education'; id: string }>({
    name: 'experience',
    id: '',
  });
  const [openClaimModal, setOpenClaimModal] = useState<{ open: boolean; url: string }>({
    open: false,
    url: '',
  });
  const totalPage = Math.ceil(credentials?.total_count / credentials?.limit) || 1;
  const generateStatus: Record<Exclude<CredentialStatus, 'ISSUED'>, StatusProps> = {
    PENDING: { icon: 'clock', label: translate('cred-pending'), theme: 'secondary', transparent: true },
    APPROVED: { icon: userProfile ? 'arrow-down' : 'arrow-up', label: translate('cred-accepted'), theme: 'success' },
    SENT: {
      icon: userProfile ? 'arrow-down' : 'arrow-up',
      label: translate('cred-issued'),
      theme: 'secondary',
      transparent: true,
    },
    REJECTED: { icon: 'alert-circle', label: translate('cred-declined'), theme: 'error' },
    CLAIMED: { icon: 'check-circle', label: translate('cred-claimed'), theme: 'success' },
  };

  const filteredIssued = (
    items: CredentialExperiencePaginateRes['items'] | CredentialEducationPaginateRes['items'],
  ) => {
    return items.filter(item => item.status !== 'PENDING' && item.status !== 'REJECTED');
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
    if (!id) return;
    try {
      const claimVC = isExperience ? claimExperienceVC : claimEducationVC;
      const { short_url } = await claimVC(id);
      setOpenClaimModal({ open: true, url: short_url });
    } catch (error) {
      console.log(`Error in claiming ${isExperience ? 'experience' : 'education'} VC:`, error);
    }
  };

  const handleClaimVC = () => window.open(openClaimModal.url, '_blank');

  const onArchive = async (id: string, isExperience: boolean) => {
    return;
  };

  const handleCloseClaimModal = () => setOpenClaimModal({ open: false, url: '' });

  return {
    issuedList,
    setIssuedList,
    totalPage,
    generateStatus,
    isMobile,
    page,
    setPage,
    onArchive,
    verified,
    userProfile,
    selectedCredential,
    onSelectCredential,
    onClaim,
    openClaimModal,
    handleCloseClaimModal,
    handleClaimVC,
  };
};
