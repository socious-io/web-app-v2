import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, Dispute } from 'src/core/api';
import { addDaysToDate, formatDateToCustomUTC } from 'src/core/time';
import { RootState } from 'src/store';

export const useDisputeDetail = () => {
  const WAIT_TO_RESPOND_DAYS = 3;
  const { disputeRes } = useLoaderData() as { disputeRes: Dispute };
  const [dispute, setDispute] = useState(disputeRes);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    subtitleName: string;
    subtitle: string;
    theme: 'warning' | 'gray';
  }>({ title: '', subtitleName: '', subtitle: '', theme: 'warning' });
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );

  const getAlertStatus = () => {
    switch (dispute.state) {
      case 'AWAITING_RESPONSE':
        if (identity?.id === dispute.claimant.id)
          setAlertInfo({
            title: 'Awaiting response from respondent',
            subtitleName: dispute.respondent.meta.name,
            subtitle: ` has until ${formatDateToCustomUTC(
              addDaysToDate(dispute.created_at, WAIT_TO_RESPOND_DAYS),
            )} to respond to your dispute.`,
            theme: 'warning',
          });
        break;
      // TODO: complete function based on dispute status in later tickets
      case 'PENDING_REVIEW':
      case 'RESOLVED':
      case 'WITHDRAWN':
        break;
    }
  };

  useEffect(() => {
    getAlertStatus();
  }, []);

  return { dispute, alertInfo };
};
