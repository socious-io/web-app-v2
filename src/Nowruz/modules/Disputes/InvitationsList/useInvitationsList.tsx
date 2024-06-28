import { useEffect, useState } from 'react';
import { InvitationStatus, InvitationsRes, invitations } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { StatusProps } from 'src/Nowruz/modules/general/components/Status/index.types';

export const useInvitationsList = (list: InvitationsRes) => {
  const isMobile = isTouchDevice();
  const [invitationsList, setInvitationsList] = useState(list.items);
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

  return { generateStatus, invitationsList, totalPage, page, setPage };
};
