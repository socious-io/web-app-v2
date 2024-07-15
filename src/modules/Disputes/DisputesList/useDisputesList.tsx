import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CurrentIdentity, DisputeDirection, DisputesRes, DisputeState, disputes } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { StatusProps } from 'src/modules/general/components/Status/index.types';
import { RootState } from 'src/store';

export const useDisputesList = (list: DisputesRes, mode: DisputeDirection) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = isTouchDevice();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const isUser = currentIdentity?.type === 'users';
  const [disputesList, setDisputesList] = useState(list.items);
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(list?.total_count / list?.limit) || 1;
  const labelAvatarField = {
    submitted: isUser ? 'Client' : 'Respondent',
    received: 'Claimant',
  };
  const generateStatus: Record<DisputeState, StatusProps> = {
    AWAITING_RESPONSE: { label: 'Awaiting response', theme: 'warning', icon: 'dot' },
    JUROR_SELECTION: { label: 'Juror selection', theme: 'warning', icon: 'dot' },
    JUROR_RESELECTION: { label: 'Juror selection', theme: 'warning', icon: 'dot' },
    PENDING_REVIEW: { label: 'Pending review', theme: 'warning', icon: 'dot' },
    DECISION_SUBMITTED: { label: 'Decision submitted', theme: 'success', icon: 'dot' },
    WITHDRAWN: { label: 'Withdrawn', theme: 'secondary', icon: '' },
    CLOSED: { label: 'Closed', theme: 'secondary', icon: '' },
  };

  useEffect(() => {
    setDisputesList(list.items);
  }, [list]);

  useEffect(() => {
    fetchMore(page);
  }, [page]);

  const fetchMore = async (page: number) => {
    const data = await disputes({ page, limit: 10, 'filter.direction': mode });
    if (isMobile && page > 1) setDisputesList([...disputesList, ...data.items]);
    else setDisputesList(data.items);
  };

  const navigateToDetailDispute = (disputeId: string) =>
    navigate(`/disputes${location.pathname.includes('contribute') ? '/contributor' : ''}/${disputeId}`);
  return {
    labelAvatarField: labelAvatarField[mode],
    generateStatus,
    disputesList,
    totalPage,
    page,
    setPage,
    navigateToDetailDispute,
  };
};
