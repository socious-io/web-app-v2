import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Invitation,
  InvitationStatus,
  InvitationsRes,
  acceptInvitation,
  declineInvitation,
  invitations,
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { StatusProps } from 'src/Nowruz/modules/general/components/Status/index.types';

import { DisputeInfo } from './index.types';

export const useInvitationsList = (list: InvitationsRes) => {
  const navigate = useNavigate();
  const isMobile = isTouchDevice();
  const [invitationsList, setInvitationsList] = useState(list.items);
  const [openModal, setOpenModal] = useState<{
    name: 'invitation' | 'expired';
    open: boolean;
    disputeInfo: DisputeInfo;
  }>({
    name: 'invitation',
    open: false,
    disputeInfo: null,
  });
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(list?.total_count / list?.limit) || 1;
  const generateStatus: Record<InvitationStatus, StatusProps> = {
    INVITED: { label: 'Invited', theme: 'warning', icon: 'dot' },
    ACCEPTED: { label: 'Accepted', theme: 'success', icon: '' },
    DECLINED: { label: 'Declined', theme: 'secondary', icon: '' },
    EXPIRED: { label: 'Expired', theme: 'secondary', icon: '' },
  };

  useEffect(() => {
    fetchMore(page);
  }, [page]);

  const fetchMore = async (page: number) => {
    const data = await invitations({ page, limit: 10 });
    if (isMobile && page > 1) setInvitationsList([...invitationsList, ...data.items]);
    else setInvitationsList(data.items);
  };

  const onClickRow = (rowId: string) => {
    const currentRow: Invitation = invitationsList[rowId];
    const currentStatus = currentRow.status;
    const actionOnStatus: Record<InvitationStatus, () => void> = {
      ACCEPTED: () => navigate(`/disputes/${currentRow.dispute.id}`),
      DECLINED: () => navigate(`/disputes/${currentRow.dispute.id}`),
      INVITED: () =>
        setOpenModal({
          name: 'invitation',
          open: true,
          disputeInfo: {
            code: currentRow.dispute.code,
            title: currentRow.dispute.title,
            invitationId: currentRow.id,
            disputeId: currentRow.dispute.id,
          },
        }),
      EXPIRED: () =>
        setOpenModal({
          name: 'expired',
          open: true,
          disputeInfo: { code: currentRow.dispute.code, invitationId: currentRow.id, disputeId: currentRow.dispute.id },
        }),
    };
    actionOnStatus[currentStatus]();
  };

  const updateInvitationList = (updated: Invitation) => {
    const updatedInvitationsList = invitationsList.map(list => (list.id === updated.id ? updated : list));
    setInvitationsList(updatedInvitationsList);
  };

  const onAcceptOrDeclineInvitation = async (mode: 'accept' | 'decline') => {
    const { disputeInfo } = openModal;
    try {
      if (disputeInfo?.invitationId) {
        const res =
          mode === 'accept'
            ? await acceptInvitation(disputeInfo.invitationId)
            : await declineInvitation(disputeInfo.invitationId);
        updateInvitationList(res);
        handleCloseModal();
      }
    } catch (e) {
      console.log(`error in ${mode === 'accept' ? 'accepting' : 'declining'} invitation`, e);
    }
  };

  const handleCloseModal = () => setOpenModal({ ...openModal, open: false });

  return {
    generateStatus,
    invitationsList,
    totalPage,
    page,
    setPage,
    onClickRow,
    openModal,
    handleCloseModal,
    onAcceptOrDeclineInvitation,
  };
};
