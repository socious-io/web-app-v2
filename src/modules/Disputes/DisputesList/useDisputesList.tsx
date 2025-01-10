import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CurrentIdentity, DisputeDirection, DisputesRes, DisputeState, disputes } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { translate } from 'src/core/utils';
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
    submitted: isUser ? translate('dispute-client') : translate('dispute-respondent'),
    received: translate('dispute-claimant'),
  };
  const generateStatus: Record<DisputeState, StatusProps> = {
    AWAITING_RESPONSE: { label: translate('dispute-status-awaiting'), theme: 'warning', icon: 'dot' },
    JUROR_SELECTION: { label: translate('dispute-status-juror-selection'), theme: 'warning', icon: 'dot' },
    JUROR_RESELECTION: { label: translate('dispute-status-juror-selection'), theme: 'warning', icon: 'dot' },
    PENDING_REVIEW: { label: translate('dispute-status-pending'), theme: 'warning', icon: 'dot' },
    DECISION_SUBMITTED: { label: translate('dispute-status-submitted'), theme: 'success', icon: 'dot' },
    WITHDRAWN: { label: translate('dispute-status-withdrawn'), theme: 'secondary', icon: '' },
    CLOSED: { label: translate('dispute-status-closed'), theme: 'secondary', icon: '' },
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
