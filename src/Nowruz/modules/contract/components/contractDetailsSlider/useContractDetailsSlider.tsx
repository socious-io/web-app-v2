import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentIdentity,
  Offer,
  StripeAccount,
  acceptOffer,
  cancelMission,
  cancelOffer,
  completeMission,
  confirmMission,
  contestMission,
  dropMission,
  getOffer,
  rejectOffer,
} from 'src/core/api';
import { isoToStandard } from 'src/core/time';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { getSrtipeProfile } from 'src/pages/offer-received/offer-received.services';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

import { ContractDetailTab } from '../contractDetailTab';

export const useContractDetailsSlider = () => {
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const selectedOfferId = useSelector<RootState, string | undefined>((state) => {
    return state.contracts.selectedOfferId;
  });
  const offer = useSelector<RootState, Offer>((state) => {
    return state.contracts.offers.find((item) => item.id === selectedOfferId);
  });

  useEffect(() => {
    inititalize();
  }, [offer]);

  const type = identity?.type;
  const name = type === 'users' ? offer.offerer.meta.name : offer.recipient.meta.name;
  const profileImage = type === 'users' ? offer.offerer.meta.image : offer.recipient.meta.avatar;

  const tabs = [
    { label: 'Details', content: <ContractDetailTab offer={offer} /> },
    // { label: 'Activity', content: <div /> },
  ];

  const dispatch = useDispatch();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [message, setMessage] = useState<ReactNode>();
  const [displayPrimaryButton, setDisplayPrimaryButton] = useState(false);
  const [displaySecondaryButton, setDisplaySecondaryButton] = useState(false);
  const [primaryButtonLabel, setPrimaryButtonLabel] = useState('');
  const [secondaryButtonLabel, setSecondaryButtonLabel] = useState('');
  const [primaryButtonAction, setPrimaryButtonAction] = useState<() => void>();
  const [secondaryButtonAction, setSecondaryButtonAction] = useState<() => void>();
  const [openAlert, setOpenAlert] = useState(false);
  const [handleAlertSubmit, setHandleAlertSubmit] = useState<() => void>();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertIcon, setAlertIcon] = useState<ReactNode>();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [paymentOffer, setPaymentOffer] = useState<Offer>();
  const [primaryButtonDisabled, setPrimaryButtonDisabled] = useState(false);
  const [stripeAccounts, setStripeAccounts] = useState<StripeAccount[]>([]);
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [openSelectCardModal, setOpenSelectCardModal] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const setAllStates = (
    displayMsg: boolean,
    msg: ReactNode | null,
    displayPrimaryBtn: boolean,
    primaryBtnLabel: string,
    displaySecondaryBtn: boolean,
    secondaryBtnLabel: string,
    primaryBtnAction?: () => void,
    secondaryBtnAction?: () => void,
  ) => {
    setDisplayMessage(displayMsg);
    setMessage(msg);
    setDisplayPrimaryButton(displayPrimaryBtn);
    setPrimaryButtonLabel(primaryBtnLabel);
    setPrimaryButtonAction(() => primaryBtnAction);
    setDisplaySecondaryButton(displaySecondaryBtn);
    setSecondaryButtonLabel(secondaryBtnLabel);
    setSecondaryButtonAction(() => secondaryBtnAction);
  };

  const initializeAcceptOfferFiat = async () => {
    await getSrtipeProfile({ is_jp: offer.currency === 'JPY' }).then((r) => {
      const { data } = r?.external_accounts || {};
      if (data?.length > 0) {
        setStripeAccounts(data);
        setPrimaryButtonDisabled(false);
        setAllStates(false, null, true, 'Accept', true, 'Decline', openSelectBankAccount, handleDecline);
      } else {
        setPrimaryButtonDisabled(true);
        const alertMsg = (
          <AlertMessage
            theme="warning"
            iconName="alert-circle"
            title="Bank account required"
            subtitle="To accept this offer you need add a payout account"
          >
            <button
              className="cursor-pointer border-none underline text-sm leading-5 font-semibold text-Warning-700"
              onClick={() => setOpenAddCardModal(true)}
            >
              Add a payout account
            </button>
          </AlertMessage>
        );
        setAllStates(true, alertMsg, true, 'Accept', true, 'Decline', openSelectBankAccount, handleDecline);
      }
    });
  };

  const initializeAcceptOfferCrypto = async () => {
    setPrimaryButtonDisabled(false);
    setAllStates(false, null, true, 'Accept', true, 'Decline', () => setOpenWalletModal(true), handleDecline);
  };

  const inititalizeAccepOffer = async () => {
    if (offer.project.payment_type === 'VOLUNTEER') {
      setPrimaryButtonDisabled(false);
      setAllStates(false, null, true, 'Accept', true, 'Decline', handleAcceptOffer, handleDecline);
      return;
    }
    if (offer.payment_mode === 'FIAT') await initializeAcceptOfferFiat();
    else if (offer.payment_mode === 'CRYPTO') initializeAcceptOfferCrypto();
  };
  const inititalize = async () => {
    if (type === 'users') {
      if (offer.status === 'PENDING') {
        setPrimaryButtonDisabled(true);
        setAllStates(false, null, true, 'Accept', true, 'Decline', undefined, handleDecline);
        await inititalizeAccepOffer();
        return;
      }

      if (offer.status === 'APPROVED') {
        const alertMsg = (
          <AlertMessage
            theme="primary"
            iconName="check-circle"
            title="You have accepted this offer"
            subtitle={`We are just waiting for the final confirmation from ${name} to start the job.`}
          />
        );
        setAllStates(true, alertMsg, false, '', false, '');
        return;
      }
      if (offer.status === 'WITHDRAWN') {
        const alertMsg = (
          <AlertMessage theme="gray" iconName="check-circle" title="" subtitle="You have declined this offer" />
        );
        setAllStates(true, alertMsg, false, '', false, '');

        return;
      }

      if (offer.status === 'HIRED' && offer.mission?.status === 'ACTIVE') {
        const alertMsg = (
          <AlertMessage
            theme="primary"
            iconName="check-circle"
            title="Your job has been confirmed"
            subtitle="Once you have finished your work please click on <b>complete</b> button."
          />
        );
        setAllStates(true, alertMsg, true, 'Complete', true, 'Stop', handleOpenCompleteConfirm, handleStop);
        return;
      }

      if (offer.status === 'CLOSED' && offer.mission?.status === 'CANCELED') {
        const alertMsg = (
          <AlertMessage theme="gray" iconName="check-circle" title="" subtitle="You have canceled this contract" />
        );
        setAllStates(true, alertMsg, false, '', false, '');
        return;
      }
      if (offer.status === 'CLOSED' && offer.mission?.status === 'COMPLETE') {
        const alertMsg = (
          <AlertMessage
            theme="warning"
            iconName="alert-circle"
            title="Completion submitted"
            subtitle={`Awaiting confirmation from <b>${name}</b>`}
          />
        );
        setAllStates(true, alertMsg, false, '', false, '');
        return;
      }
    }
    if (type === 'organizations') {
      if (offer.status === 'APPROVED' && offer.assignment_total) {
        const alertMsg = (
          <AlertMessage
            theme="warning"
            iconName="alert-circle"
            title="Payment required"
            subtitle={`${name} has accepted your offer. Proceed to payment to start this job.`}
          />
        );
        setAllStates(
          true,
          alertMsg,
          true,
          'Proceed to payment',
          true,
          'Withdraw',
          handleOpenPaymentModal,
          withdrawOfferByOP,
        );
        return;
      }
      if (offer.status === 'HIRED' && offer.assignment_total) {
        const alertMsg = (
          <AlertMessage
            theme="primary"
            iconName="alert-circle"
            title="Payment was done successfully"
            subtitle={`${name} can now start the job`}
          />
        );
        setAllStates(true, alertMsg, false, '', true, 'Stop', undefined, handleStopByOP);
        return;
      }
      if (offer.status === 'CLOSED' && offer.mission?.status === 'KICKED_OUT') {
        const alertMsg = (
          <AlertMessage theme="gray" iconName="alert-circle" title="You have stopped this contract" subtitle="" />
        );
        setAllStates(true, alertMsg, false, '', false, '');
        return;
      }
      if (offer.status === 'CANCELED') {
        const alertMsg = (
          <AlertMessage theme="gray" iconName="alert-circle" title="You have canceled this offer" subtitle="" />
        );
        setAllStates(true, alertMsg, false, '', false, '');
        return;
      }
      if (offer.status === 'CLOSED' && offer.mission?.status === 'COMPLETE') {
        const alertMsg = (
          <AlertMessage
            theme="warning"
            iconName="alert-circle"
            title="Awaiting confirmation"
            subtitle={`<b>${name}</b> has marked this job completed. Confirm so they can receive payment.`}
          />
        );
        setAllStates(
          true,
          alertMsg,
          true,
          'Confirm completion',
          true,
          'Contest',
          handleConfirmCompletion,
          handleContest,
        );
        return;
      }

      if (offer.status === 'CLOSED' && offer.mission?.status === 'CONFIRMED') {
        const alertMsg = (
          <AlertMessage
            theme="primary"
            iconName="info-circle"
            title="Job completed"
            subtitle={`Completed on ${isoToStandard(offer.mission.updated_at.toString())}`}
          />
        );
        setAllStates(true, alertMsg, false, '', true, 'Review', undefined, handleReview);
        return;
      }
    }

    setAllStates(false, null, false, '', false, '');
  };

  const openSelectBankAccount = () => {
    setOpenSelectCardModal(true);
  };

  const handleAcceptOffer = async () => {
    try {
      dispatch(updateStatus({ id: offer.id, offerStatus: 'APPROVED' }));
      acceptOffer(offer.id);
      setOpenSelectCardModal(false);
      setOpenWalletModal(false);
    } catch (error) {}
  };
  const handleDecline = async () => {
    dispatch(updateStatus({ id: offer.id, offerStatus: 'WITHDRAWN' }));
    rejectOffer(offer.id);
  };

  const handleStop = async () => {
    dispatch(updateStatus({ id: offer.id, offerStatus: 'CLOSED', missionStatus: 'CANCELED' }));
    if (offer.mission) cancelMission(offer.mission.id);
  };
  const handleOpenCompleteConfirm = () => {
    setAlertTitle('Submit job completion?');
    setAlertIcon(<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />);
    setAlertMessage(`Once ${name} confirms the job completion, you will receive your payment.`);
    setHandleAlertSubmit(() => handleComplete());
    setOpenAlert(true);
  };
  const handleComplete = async () => {
    setOpenAlert(false);
    dispatch(updateStatus({ id: offer.id, offerStatus: 'CLOSED', missionStatus: 'COMPLETE' }));
    if (offer.mission) completeMission(offer.mission.id);
    setOpenAlert(false);
  };

  const handleOpenPaymentModal = async () => {
    const res = await getOffer(offer.id);
    setPaymentOffer(res);
    setOpenPaymentModal(true);
  };

  const handleClosePaymentModal = (paymentSuccess: boolean) => {
    if (paymentSuccess) {
      dispatch(updateStatus({ id: offer.id, offerStatus: 'HIRED', missionStatus: 'ACTIVE' }));
    }
    setOpenPaymentModal(false);
  };
  const handleStopByOP = async () => {
    dispatch(updateStatus({ id: offer.id, offerStatus: 'CLOSED', missionStatus: 'KICKED_OUT' }));
    if (offer.mission) dropMission(offer.mission.id);
  };

  const withdrawOfferByOP = async () => {
    dispatch(updateStatus({ id: offer.id, offerStatus: 'CANCELED' }));
    cancelOffer(offer.id);
  };

  const onConfirm = async () => {
    if (!offer.mission) return;
    setOpenAlert(false);
    dispatch(updateStatus({ id: offer.id, offerStatus: 'CLOSED', missionStatus: 'CONFIRMED' }));
    confirmMission(offer.mission.id);
  };

  const handleConfirmCompletion = async () => {
    setAlertTitle('Confirm completion');
    setAlertIcon(<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />);
    setAlertMessage(`Do you want to job completion?`);
    setHandleAlertSubmit(() => onConfirm());
    setOpenAlert(true);
  };

  const handleContest = async () => {
    if (!offer.mission) return;
    await contestMission(offer.mission.id);
  };

  const handleReview = () => {
    setOpenReviewModal(true);
  };

  return {
    name,
    profileImage,
    type,
    tabs,
    displayMessage,
    message,
    displayPrimaryButton,
    primaryButtonLabel,
    primaryButtonAction,
    displaySecondaryButton,
    secondaryButtonLabel,
    secondaryButtonAction,
    openAlert,
    setOpenAlert,
    handleAlertSubmit,
    alertIcon,
    alertTitle,
    alertMessage,
    openPaymentModal,
    setOpenPaymentModal,
    handleClosePaymentModal,
    openReviewModal, 
    setOpenReviewModal,
    paymentOffer,
    primaryButtonDisabled,
    setPrimaryButtonDisabled,
    openAddCardModal,
    setOpenAddCardModal,
    handleAcceptOffer,
    openSelectCardModal,
    setOpenSelectCardModal,
    stripeAccounts,
    openWalletModal,
    setOpenWalletModal,
    offer,
  };
};
