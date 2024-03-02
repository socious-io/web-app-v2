import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Contract,
  CurrentIdentity,
  Offer,
  StripeAccount,
  acceptOffer,
  cancelMission,
  cancelOffer,
  completeMission,
  confirmMission,
  connectionStatus,
  contestMission,
  dropMission,
  getOffer,
  hireOffer,
  rejectOffer,
  stripeProfile,
} from 'src/core/api';
import { isoToStandard } from 'src/core/time';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

import { ContractDetailTab } from '../contractDetailTab';

export const useContractDetailsSlider = () => {
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const navigate = useNavigate();
  const selectedOfferId = useSelector<RootState, string | undefined>((state) => {
    return state.contracts.selectedOfferId;
  });
  const contract = useSelector<RootState, Contract>((state) => {
    return state.contracts.offers.find((item) => item.id === selectedOfferId);
  });

  const checkMessageButtonStatus = async () => {
    if (type === 'organizations') {
      setDisableMessageButton(false);
      return;
    }

    const res = (await connectionStatus(contract?.organization.id)).connect;
    setDisableMessageButton(!res);
  };

  useEffect(() => {
    inititalize();
    checkMessageButtonStatus();
  }, [contract]);

  const type = identity?.type;
  const name = type === 'users' ? contract.offerer.meta.name : contract.recipient.meta.name;
  const profileImage = type === 'users' ? contract.offerer.meta.image : contract.recipient.meta.avatar;

  const tabs = [
    { label: 'Details', content: <ContractDetailTab contract={contract} /> },
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
  const [disableMessageButton, setDisableMessageButton] = useState(true);

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
    await stripeProfile({ is_jp: contract.currency === 'JPY' }).then((r) => {
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
    if (contract.project.payment_type === 'VOLUNTEER') {
      setPrimaryButtonDisabled(false);
      setAllStates(false, null, true, 'Accept', true, 'Decline', handleAcceptOffer, handleDecline);
      return;
    }
    if (contract.payment_mode === 'FIAT') await initializeAcceptOfferFiat();
    else if (contract.payment_mode === 'CRYPTO') initializeAcceptOfferCrypto();
  };
  const inititalize = async () => {
    let alertMsg = null;
    switch (contract.contractStatus) {
      case 'Offer sent':
        alertMsg = (
          <AlertMessage
            theme="gray"
            iconName="check-circle"
            title="You have sent an offer to the applicant"
            subtitle=""
          />
        );
        setAllStates(true, alertMsg, false, '', true, 'Withdraw', undefined, withdrawOfferByOP);
        break;
      case 'Offer received':
        setPrimaryButtonDisabled(true);
        setAllStates(false, null, true, 'Accept', true, 'Decline', undefined, handleDecline);
        await inititalizeAccepOffer();
        break;

      case 'Awaiting confirmation':
        if (contract.status === 'APPROVED') {
          //approved by Umaya, waiting for OP confirmation
          alertMsg = (
            <AlertMessage
              theme="primary"
              iconName="check-circle"
              title={type === 'users' ? 'You have accepted this offer' : `${name} has accepted this offer`}
              subtitle={
                type === 'users'
                  ? `We are just waiting for the final confirmation from ${name} to start the job.`
                  : ' We are just waiting for the final confirmation from you to start the job. '
              }
            />
          );
          if (type === 'users') setAllStates(true, alertMsg, false, '', false, '');
          else setAllStates(true, alertMsg, true, 'Confirm', true, 'Cancel', hadleHireVolunteer, withdrawOfferByOP);
        } else if (contract.mission?.status === 'COMPLETE') {
          //completed by Umaya, waiting fot OP confirmation
          if (type === 'users') {
            alertMsg = (
              <AlertMessage
                theme="warning"
                iconName="alert-circle"
                title="Completion submitted"
                subtitle={`Awaiting confirmation from <b>${name}</b>`}
              />
            );
            setAllStates(true, alertMsg, false, '', false, '');
          } else {
            alertMsg = (
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
          }
        }
        break;
      case 'Withdrawn':
        alertMsg = (
          <AlertMessage
            theme="gray"
            iconName="alert-circle"
            title={type === 'users' ? 'you have declined this offer' : `${name} has declined this offer`}
            subtitle=""
          />
        );
        setAllStates(true, alertMsg, false, '', false, '');
        break;
      case 'Payment required':
        alertMsg = (
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
        break;
      case 'Ongoing':
        if (type === 'users') {
          alertMsg = (
            <AlertMessage
              theme="primary"
              iconName="check-circle"
              title="Your job has been confirmed"
              subtitle="Once you have finished your work please click on <b>complete</b> button."
            />
          );
          setAllStates(true, alertMsg, true, 'Complete', true, 'Stop', handleOpenCompleteConfirm, handleStop);
        } else {
          if (contract.project.payment_type === 'VOLUNTEER')
            setAllStates(false, null, false, '', true, 'Stop', undefined, handleStopByOP);
          else {
            alertMsg = (
              <AlertMessage
                theme="primary"
                iconName="alert-circle"
                title="Payment was done successfully"
                subtitle={`${name} can now start the job`}
              />
            );
            setAllStates(true, alertMsg, false, '', true, 'Stop', undefined, handleStopByOP);
          }
        }
        break;
      case 'Kicked out':
        if (type === 'users') {
          alertMsg = (
            <AlertMessage
              theme="gray"
              iconName="alert-circle"
              title={`${name} have stopped this contract`}
              subtitle=""
            />
          );
          setAllStates(true, alertMsg, false, '', false, '');
        } else {
          alertMsg = (
            <AlertMessage theme="gray" iconName="alert-circle" title="You have stopped this contract" subtitle="" />
          );
          setAllStates(true, alertMsg, false, '', false, '');
        }
        break;

      case 'Canceled':
        if (contract.status === 'CANCELED') {
          alertMsg = (
            <AlertMessage
              theme="gray"
              iconName="alert-circle"
              title={type === 'users' ? `${name} has canceled this offer` : 'You have canceled this offer'}
              subtitle=""
            />
          );
          setAllStates(true, alertMsg, false, '', false, '');
        }
        if (contract.mission?.status === 'CANCELED') {
          alertMsg = (
            <AlertMessage
              theme="gray"
              iconName="alert-circle"
              title={type === 'users' ? 'You have canceled this contract' : `${name} has canceled this contract`}
              subtitle=""
            />
          );
          setAllStates(true, alertMsg, false, '', false, '');
        }
        break;
      case 'Completed':
        if (type === 'users') {
          setAllStates(false, null, false, '', false, '');
        } else {
          const alertMsg = (
            <AlertMessage
              theme="primary"
              iconName="info-circle"
              title="Job completed"
              subtitle={`Completed on ${isoToStandard(contract.mission.updated_at.toString())}`}
            />
          );

          if (!contract.org_feedback) {
            setAllStates(true, alertMsg, false, '', true, 'Review', undefined, handleReview);
          } else setAllStates(true, alertMsg, false, '', false, '');
        }
        break;
      default:
        setAllStates(false, null, false, '', false, '');
    }
  };

  const openSelectBankAccount = () => {
    setOpenSelectCardModal(true);
  };

  const handleAcceptOffer = async () => {
    try {
      dispatch(
        updateStatus({ type, paymentType: contract.project.payment_type, id: contract.id, offerStatus: 'APPROVED' }),
      );
      acceptOffer(contract.id);
      setOpenSelectCardModal(false);
      setOpenWalletModal(false);
    } catch (error) {}
  };
  const handleDecline = async () => {
    dispatch(
      updateStatus({ type, paymentType: contract.project.payment_type, id: contract.id, offerStatus: 'WITHDRAWN' }),
    );
    rejectOffer(contract.id);
  };

  const hadleHireVolunteer = async () => {
    await hireOffer(contract.id);
    dispatch(
      updateStatus({
        type,
        paymentType: contract.project.payment_type,
        id: contract.id,
        offerStatus: 'HIRED',
        missionStatus: 'ACTIVE',
      }),
    );
    return;
  };
  const handleStop = async () => {
    dispatch(
      updateStatus({
        type,
        paymentType: contract.project.payment_type,
        id: contract.id,
        offerStatus: 'CLOSED',
        missionStatus: 'CANCELED',
      }),
    );
    if (contract.mission) cancelMission(contract.mission.id);
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
    dispatch(
      updateStatus({
        type,
        paymentType: contract.project.payment_type,
        id: contract.id,
        offerStatus: 'CLOSED',
        missionStatus: 'COMPLETE',
      }),
    );
    if (contract.mission) completeMission(contract.mission.id);
    setOpenAlert(false);
  };

  const handleOpenPaymentModal = async () => {
    const res = await getOffer(contract.id);
    setPaymentOffer(res);
    setOpenPaymentModal(true);
  };

  const handleClosePaymentModal = (paymentSuccess: boolean) => {
    if (paymentSuccess) {
      dispatch(
        updateStatus({
          type,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'HIRED',
          missionStatus: 'ACTIVE',
        }),
      );
    }
    setOpenPaymentModal(false);
  };
  const handleStopByOP = async () => {
    dispatch(
      updateStatus({
        type,
        paymentType: contract.project.payment_type,
        id: contract.id,
        offerStatus: 'CLOSED',
        missionStatus: 'KICKED_OUT',
      }),
    );
    if (contract.mission) dropMission(contract.mission.id);
  };

  const withdrawOfferByOP = async () => {
    dispatch(
      updateStatus({ type, paymentType: contract.project.payment_type, id: contract.id, offerStatus: 'CANCELED' }),
    );
    cancelOffer(contract.id);
  };

  const onConfirm = async () => {
    if (!contract.mission) return;
    setOpenAlert(false);
    dispatch(
      updateStatus({
        type,
        paymentType: contract.project.payment_type,
        id: contract.id,
        offerStatus: 'CLOSED',
        missionStatus: 'CONFIRMED',
      }),
    );
    confirmMission(contract.mission.id);
  };

  const handleConfirmCompletion = async () => {
    setAlertTitle('Confirm completion');
    setAlertIcon(<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />);
    setAlertMessage(`Do you want to job completion?`);
    setHandleAlertSubmit(() => onConfirm());
    setOpenAlert(true);
  };

  const handleContest = async () => {
    if (!contract.mission) return;
    await contestMission(contract.mission.id);
  };

  const handleReview = () => {
    setOpenReviewModal(true);
  };

  const redirectToChat = () => {
    const participantId = type === 'users' ? contract.offerer.meta.id : contract.recipient.meta.id;
    navigate(`../chats?participantId=${participantId}`);
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
    redirectToChat,
    contract,
    disableMessageButton,
  };
};
