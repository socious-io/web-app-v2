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

  const [primaryBtn, setPrimaryBtn] = useState<{ label: string; display: boolean; action?: () => void }>();
  const [secondaryBtn, setSecondaryBtn] = useState<{ label: string; display: boolean; action?: () => void }>();

  const navigate = useNavigate();

  const initialize = () => {
    switch (dispute.state) {
      case 'AWAITING_RESPONSE':
        if (dispute.direction === 'submitted') {
          setAlertInfo({
            title: 'Awaiting response from respondent',
            subtitleName: dispute.respondent.meta.name,
            subtitle: ` has until ${formatDateToCustomUTC(
              addDaysToDate(dispute.created_at, WAIT_TO_RESPOND_DAYS),
            )} to respond to your dispute.`,
            theme: 'warning',
          });
          setPrimaryBtn({ label: 'Message', display: true, action: redirectToChat });
          setSecondaryBtn({ label: 'Withdraw', display: true, action: () => setOpenModal(true) });
        } else if (dispute.direction === 'received') {
          setAlertInfo({
            title: 'Awaiting response from you',
            subtitleName: '',
            subtitle: `You have until ${formatDateToCustomUTC(
              addDaysToDate(dispute.created_at, WAIT_TO_RESPOND_DAYS),
            )} to respond to your dispute. Failure to respond may result in a default judgment in favor of the claimant.`,
            theme: 'warning',
          });
          setPrimaryBtn({
            label: 'Submit response',
            display: true,
            // TODO: add open response modal
            //action: () => { }
          });
          setSecondaryBtn({ label: 'Message', display: true, action: redirectToChat });
        }
        break;
      case 'PENDING_REVIEW':
        setAlertInfo({
          title: 'Pending review from jurors',
          subtitleName: '',
          subtitle: `Your response has been successfully recorded and is now awaiting for review from jurors. Once assigned, jurors have 7 days to reach a decision.`,
          theme: 'warning',
        });
        setPrimaryBtn({
          label: 'Message',
          display: true,
          action: redirectToChat,
        });
        setSecondaryBtn({ label: '', display: false });
        // TODO: complete function based on dispute status in later tickets
        break;
      case 'RESOLVED':
        // TODO: complete function based on dispute status in later tickets
        break;
      case 'WITHDRAWN':
        setAlertInfo({
          title: 'Dispute withdrawn',
          subtitleName: '',
          subtitle: `${
            dispute.direction === 'submitted' ? 'You' : dispute.claimant.meta.name
          } withdrew this dispute on ${formatDateToCustomUTC(dispute.updated_at)}`,
          theme: 'gray',
        });
        setPrimaryBtn({ label: '', display: false });
        setSecondaryBtn({ label: '', display: false });
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
    initialize();
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

  return { dispute, alertInfo, openModal, setOpenModal, primaryBtn, secondaryBtn, handleWithdraw };
};
