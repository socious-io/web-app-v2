import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Dispute, withdrawDispute, dispute as getDisputeApi, Identity, CurrentIdentity, UserMeta } from 'src/core/api';
import { addDaysToDate, formatDateToCustomUTC } from 'src/core/time';
import { RootState } from 'src/store';

export const useDisputeDetail = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );

  const WAIT_TO_RESPOND_DAYS = 3;
  const WAIT_TO_DECISIOON_DAYS = 7;
  const location = useLocation();

  const { disputeRes } = useLoaderData() as { disputeRes: Dispute };
  const [openModal, setOpenModal] = useState<{
    name?: 'withdraw' | 'submitDecision' | 'impactPoint' | 'response';
    open: boolean;
  }>({ open: false });
  const [dispute, setDispute] = useState(disputeRes);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    subtitleName: string;
    subtitle: string;
    theme: 'warning' | 'gray' | 'success';
    icon: string;
  }>({ title: '', subtitleName: '', subtitle: '', theme: 'warning', icon: '' });

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
            icon: 'alert-circle',
          });
          setPrimaryBtn({ label: 'Message', display: true, action: redirectToChat });
          setSecondaryBtn({
            label: 'Withdraw',
            display: true,
            action: () => setOpenModal({ name: 'withdraw', open: true }),
          });
        } else if (dispute.direction === 'received') {
          setAlertInfo({
            title: 'Awaiting response from you',
            subtitleName: '',
            subtitle: `You have until ${formatDateToCustomUTC(
              addDaysToDate(dispute.created_at, WAIT_TO_RESPOND_DAYS),
            )} to respond to your dispute. Failure to respond may result in a default judgment in favor of the claimant.`,
            theme: 'warning',
            icon: 'alert-circle',
          });
          setPrimaryBtn({
            label: 'Submit response',
            display: true,
            action: () => {
              setOpenModal({ name: 'response', open: true });
            },
          });
          setSecondaryBtn({ label: 'Message', display: true, action: redirectToChat });
        }
        break;
      case 'JUROR_SELECTION':
        switch (dispute.direction) {
          case 'juror':
            setAlertInfo({
              title: "You've been selected as a juror",
              subtitleName: '',
              subtitle:
                "Thank you for accepting the invitation to serve as a juror. We'll notify you once two more jurors have been selected to start the review.",
              theme: 'warning',
              icon: 'alert-circle',
            });
            setPrimaryBtn({ label: '', display: false });
            setSecondaryBtn({ label: '', display: false });
            break;
          case 'received':
            setAlertInfo({
              title: 'Pending review from jurors',
              subtitleName: '',
              subtitle: `Your response has been successfully recorded and is now awaiting for review from jurors. Once assigned, jurors have 7 days to reach a decision.`,
              theme: 'warning',
              icon: 'alert-circle',
            });
            setPrimaryBtn({
              label: 'Message',
              display: true,
              action: redirectToChat,
            });
            setSecondaryBtn({ label: '', display: false });
            break;
          case 'submitted':
            setAlertInfo({
              title: 'Pending review by jurors',
              subtitleName: dispute.respondent.meta.name,
              subtitle: ` has submitted a response.
              Your dispute is now awaiting for review from jurors, once assigned they will have 7 days to reach a decision.`,
              theme: 'warning',
              icon: 'alert-circle',
            });
            setPrimaryBtn({ label: 'Message', display: true, action: redirectToChat });
            setSecondaryBtn({
              label: 'Withdraw',
              display: true,
              action: () => setOpenModal({ name: 'withdraw', open: true }),
            });
            break;
        }
        break;
      case 'JUROR_RESELECTION':
        setAlertInfo({
          title: 'Pending review by jurors',
          subtitleName: '',
          subtitle:
            'Unfortunately, one or more jurors did not submit their decision within the allocated time frame. As a result, the case will be reassigned to a new juror to ensure a fair and timely resolution.',
          theme: 'warning',
          icon: 'alert-circle',
        });
        setSecondaryBtn({ label: '', display: false });
        switch (dispute.direction) {
          case 'juror':
            setPrimaryBtn({ label: '', display: false });
            break;
          case 'submitted':
            setPrimaryBtn({ label: 'Message', display: true, action: redirectToChat });
            setSecondaryBtn({
              label: 'Withdraw',
              display: true,
              action: () => setOpenModal({ name: 'withdraw', open: true }),
            });
            break;
          case 'received':
            setPrimaryBtn({ label: 'Message', display: true, action: redirectToChat });
            setSecondaryBtn({ label: '', display: false });
            break;
        }

        break;
      case 'PENDING_REVIEW':
        switch (dispute.direction) {
          case 'juror':
            setAlertInfo({
              title: 'Pending review by jurors',
              subtitleName: '',
              subtitle: `The jury selection process is now complete, you will be collaborating with two other jurors to review the case materials and reach a fair decision.You have until ${formatDateToCustomUTC(
                addDaysToDate(dispute.updated_at, WAIT_TO_DECISIOON_DAYS),
              )} to make a decision. If you don't submit before this date, another juror will be selected.`,
              theme: 'warning',
              icon: 'alert-circle',
            });
            setPrimaryBtn({
              label: 'Submit decision',
              display: true,
              action: () => setOpenModal({ name: 'submitDecision', open: true }),
            });
            setSecondaryBtn({ label: '', display: false });
            break;
          case 'received':
            setAlertInfo({
              title: 'Pending review by jurors',
              subtitleName: '',
              subtitle: `3 jurors have been selected. They have until ${formatDateToCustomUTC(
                addDaysToDate(dispute.updated_at, WAIT_TO_DECISIOON_DAYS),
              )} to reach a decision.`,
              theme: 'warning',
              icon: 'alert-circle',
            });
            setPrimaryBtn({ label: 'Message', display: true, action: redirectToChat });
            setSecondaryBtn({ label: '', display: false });
            break;
          case 'submitted':
            setAlertInfo({
              title: 'Pending review by jurors',
              subtitleName: '',
              subtitle: `3 jurors have been selected. They have until ${formatDateToCustomUTC(
                addDaysToDate(dispute.updated_at, WAIT_TO_DECISIOON_DAYS),
              )} to reach a decision.`,
              theme: 'warning',
              icon: 'alert-circle',
            });
            setPrimaryBtn({ label: 'Message', display: true, action: redirectToChat });
            setSecondaryBtn({
              label: 'Withdraw',
              display: true,
              action: () => setOpenModal({ name: 'withdraw', open: true }),
            });
            break;
        }
        break;
      case 'DECISION_SUBMITTED':
        if (dispute.direction === 'juror') {
          setAlertInfo({
            title: 'Decision submitted',
            subtitleName: '',
            subtitle: `You decision has been submitted on ${formatDateToCustomUTC(dispute.updated_at)}`,
            theme: 'success',
            icon: 'check-circle',
          });
          setPrimaryBtn({ label: '', display: false });
          setSecondaryBtn({ label: '', display: false });
        } else {
          setAlertInfo({
            title: 'Closed',
            subtitleName: '',
            subtitle: `The jurors have decided to file against you on ${formatDateToCustomUTC(dispute.updated_at)}`,
            theme: 'gray',
            icon: 'info-circle',
          });
          setPrimaryBtn({ label: '', display: false });
          setSecondaryBtn({ label: '', display: false });
        }
        break;
      case 'WITHDRAWN':
        setAlertInfo({
          title: 'Dispute withdrawn',
          subtitleName: '',
          subtitle: `${
            dispute.direction === 'submitted' ? 'You' : dispute.claimant.meta.name
          } withdrew this dispute on ${formatDateToCustomUTC(dispute.updated_at)}`,
          theme: 'gray',
          icon: 'alert-circle',
        });
        setPrimaryBtn({ label: '', display: false });
        setSecondaryBtn({ label: '', display: false });
        break;
      case 'CLOSED':
        if (dispute.direction === 'juror') {
          setAlertInfo({
            title: 'Decision submitted',
            subtitleName: '',
            subtitle: `You decision has been submitted on ${formatDateToCustomUTC(dispute.updated_at)}`,
            theme: 'success',
            icon: 'check-circle',
          });
          setPrimaryBtn({ label: '', display: false });
          setSecondaryBtn({ label: '', display: false });
        } else {
          setAlertInfo({
            title: 'Closed',
            subtitleName: '',
            subtitle: `The jurors have decided to file against you on ${formatDateToCustomUTC(dispute.updated_at)}`,
            theme: 'gray',
            icon: 'info-circle',
          });
          setPrimaryBtn({ label: '', display: false });
          setSecondaryBtn({ label: '', display: false });
        }

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
    setOpenModal({ name: 'withdraw', open: false });
  };

  useEffect(() => {
    initialize();
  }, [dispute]);

  const redirectToChat = (person?: 'claimant' | 'respondent') => {
    let id = '';
    switch (dispute.direction) {
      case 'submitted':
        id = dispute.respondent.id;
        break;
      case 'received':
        id = dispute.claimant.id;
        break;
      case 'juror':
        id = person === 'claimant' ? dispute.claimant.id : dispute.respondent.id;
        break;
    }
    id && navigate(`/chats?participantId=${id}`);
  };

  const handleCloseSubmit = (submitted: boolean) => {
    if (submitted) setOpenModal({ name: 'impactPoint', open: true });
    else setOpenModal({ name: 'submitDecision', open: false });
  };

  const handleRespond = (newDispute: Dispute) => setDispute(newDispute);

  const handleBack = () => {
    const path = location.pathname.includes('contributor')
      ? `/${(currentIdentity?.meta as UserMeta).username}/contribute/center`
      : '/disputes';
    navigate(path);
  };

  const handleCloseImpactPoint = async () => {
    const res = await getDisputeApi(dispute.id);
    setDispute(res);
    setOpenModal({ open: false });
  };
  return {
    dispute,
    setDispute,
    alertInfo,
    openModal,
    setOpenModal,
    primaryBtn,
    secondaryBtn,
    handleWithdraw,
    redirectToChat,
    handleCloseSubmit,
    handleRespond,
    handleBack,
    handleCloseImpactPoint,
  };
};
