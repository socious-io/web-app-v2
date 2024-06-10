import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Dispute, withdrawDispute, dispute as getDisputeApi } from 'src/core/api';
import { addDaysToDate, formatDateToCustomUTC } from 'src/core/time';

export const useDisputeDetail = () => {
  const WAIT_TO_RESPOND_DAYS = 3;
  const { disputeRes } = useLoaderData() as { disputeRes: Dispute };
  const [openModal, setOpenModal] = useState(false);
  const [dispute, setDispute] = useState(disputeRes);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    subtitleName: string;
    subtitle: string;
    theme: 'warning' | 'gray';
  }>({ title: '', subtitleName: '', subtitle: '', theme: 'warning' });

  const navigate = useNavigate();
  const displayActionButtons = dispute.state === 'AWAITING_RESPONSE' && dispute.direction === 'submitted';
  const getAlertStatus = () => {
    switch (dispute.state) {
      case 'AWAITING_RESPONSE':
        if (dispute.direction === 'submitted')
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
        setAlertInfo({
          title: 'Dispute withdrawn',
          subtitleName: '',
          subtitle: `${
            dispute.direction === 'submitted' ? 'You' : dispute.claimant.meta.name
          } withdrew this dispute on ${formatDateToCustomUTC(dispute.updated_at)}`,
          theme: 'gray',
        });
        break;
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawDispute(dispute.id);
      const res = await getDisputeApi(dispute.id);
      setDispute(res);
    } catch (e) {
      console.log('error in withdrawing dispute');
    }
    setOpenModal(false);
  };

  useEffect(() => {
    getAlertStatus();
  }, [dispute]);

  const redirectToChat = () => {
    let id = '';
    switch (dispute.direction) {
      case 'submitted':
        id = dispute.respondent.id;
        break;
      case 'received':
        id = dispute.claimant.id;
        break;
      case 'juror':
        break;
    }
    id && navigate(`/chats?participantId=${id}`);
  };

  return { dispute, alertInfo, openModal, setOpenModal, displayActionButtons, handleWithdraw, redirectToChat };
};
