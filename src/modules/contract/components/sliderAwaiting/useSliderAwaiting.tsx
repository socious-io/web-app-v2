import { useEffect } from 'react';
import { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, cancelOffer, confirmMission, hireOffer } from 'src/core/api';
import { UserType } from 'src/core/types';
import { getIdentityMeta, navigateToProfile, translate } from 'src/core/utils';
import dapp from 'src/dapp';
import { useWeb3 } from 'src/dapp/dapp.connect';
import { AlertMessage } from 'src/modules/general/components/alertMessage';
import { MenuItem } from 'src/modules/general/components/threeDotButton/threeDotButton.types';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderAwaiting = (contract: Contract) => {
  const dispatch = useDispatch();
  const web3 = useWeb3();

  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;
  const [alertMsg, setAlertMsg] = useState<ReactNode>();
  const [primaryBtn, setPrimaryBtn] = useState<{
    display: boolean;
    label: string;
    action?: () => void;
    disabled?: boolean;
  }>({ display: false, label: '' });
  const [secondaryBtn, setSecondaryBtn] = useState<{ display: boolean; label: string; action?: () => void }>({
    display: false,
    label: '',
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [openInitiateDisputeModal, setOpenInitiateDisputeModal] = useState(false);
  const displayDispute = contract.mission?.status === 'COMPLETE';
  const { name, username, type } = getIdentityMeta(identityType === 'users' ? contract.offerer : contract.recipient);
  const respondentId = identityType === 'users' ? contract.offerer.id : contract.recipient.id;
  const missionId = contract.mission?.id || '';

  const initialize = () => {
    if (identityType === 'users') {
      setPrimaryBtn({ display: false, label: '' });
      setSecondaryBtn({ display: false, label: '' });
    }
    if (contract.status === 'APPROVED') {
      setAlertMsg(
        <AlertMessage
          theme="primary"
          iconName="check-circle"
          title={
            identityType === 'users'
              ? translate('cont-awaiting-title-you')
              : translate('cont-awaiting-title-name', { name: name })
          }
          subtitle={translate('cont-awaiting-desc', { name: identityType === 'users' ? name : 'you' })}
        />,
      );
      if (identityType === 'organizations') {
        setPrimaryBtn({ display: true, label: translate('cont-confirm'), action: hadleHireVolunteer });
        setSecondaryBtn({ display: true, label: translate('cont-cancel'), action: withdrawOfferByOP });
      }
      return;
    }

    if (contract.mission?.status === 'COMPLETE') {
      //completed by Umaya, waiting fot OP confirmation
      setAlertMsg(
        <AlertMessage
          theme="warning"
          iconName="alert-circle"
          title={identityType === 'users' ? translate('cont-complete-submit') : translate('cont-awaiting-confirm')}
          subtitle={
            identityType === 'users'
              ? translate('cont-awaiting-msg', { name: name })
              : `${translate('cont-awaiting-confirm-msg', { name: name })}${contract.project.payment_type === 'VOLUNTEER' ? '' : translate('cont-awaiting-confirm-msg-rest')}`
          }
        />,
      );

      if (identityType === 'organizations') {
        setPrimaryBtn({ display: true, label: translate('cont-confirm-completion'), action: () => setOpenAlert(true) });
      }
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const hadleHireVolunteer = async () => {
    try {
      await hireOffer(contract.id);
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'HIRED',
          missionStatus: 'ACTIVE',
        }),
      );
    } catch (e) {
      console.log('error in hiring', e);
    }
  };

  const withdrawOfferByOP = async () => {
    try {
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'CANCELED',
        }),
      );
      cancelOffer(contract.id);
    } catch (e) {
      console.log('error in withdrawing offer by organization', e);
    }
  };

  const onConfirm = async () => {
    try {
      if (!contract.mission) return;
      setOpenAlert(false);
      setPrimaryBtn({ ...primaryBtn, disabled: true });
      let allowConfirm = true;
      if (contract.payment_mode === 'CRYPTO') {
        if (web3.signer && web3.chainId) {
          await dapp.withdrawnEscrow({
            signer: web3.signer,
            chainId: web3.chainId,
            escrowId: contract?.payment?.meta.id as string,
          });
        } else {
          allowConfirm = false;
          await web3.open();
        }
      }
      if (allowConfirm) {
        await confirmMission(contract.mission.id);
        dispatch(
          updateStatus({
            type: identityType,
            paymentType: contract.project.payment_type,
            id: contract.id,
            offerStatus: 'CLOSED',
            missionStatus: 'CONFIRMED',
          }),
        );
      }
    } catch (e) {
      console.log('error in confirming mission', e);
    }
    setPrimaryBtn({ ...primaryBtn, disabled: false });
  };

  const menuItems: MenuItem[] = [
    {
      iconName: 'building-06',
      title: translate('cont-profile-title', { name: name }),
      onClick: () => {
        navigateToProfile(username, type as UserType);
      },
    },
    {
      iconName: 'message-alert-circle',
      title: translate('cont-initiate-dispute'),
      onClick: () => setOpenInitiateDisputeModal(true),
    },
  ];
  return {
    onConfirm,
    primaryBtn,
    secondaryBtn,
    alertMsg,
    openAlert,
    setOpenAlert,
    displayDispute,
    menuItems,
    openInitiateDisputeModal,
    setOpenInitiateDisputeModal,
    respondentId,
    missionId,
  };
};
