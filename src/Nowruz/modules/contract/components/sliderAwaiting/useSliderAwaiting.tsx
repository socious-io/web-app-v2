import { useEffect } from 'react';
import { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, cancelOffer, confirmMission, hireOffer } from 'src/core/api';
import { UserType } from 'src/core/types';
import { getIdentityMeta, navigateToProfile } from 'src/core/utils';
import dapp from 'src/dapp';
import { useWeb3 } from 'src/dapp/dapp.connect';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { MenuItem } from 'src/Nowruz/modules/general/components/threeDotButton/threeDotButton.types';
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
  const displayDispute = contract.mission?.status === 'COMPLETE';
  const { name, username, type } = getIdentityMeta(identityType === 'users' ? contract.offerer : contract.recipient);

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
          title={identityType === 'users' ? 'You have accepted this offer' : `${name} has accepted this offer`}
          subtitle={
            identityType === 'users'
              ? `We are just waiting for the final confirmation from ${name} to start the job.`
              : ' We are just waiting for the final confirmation from you to start the job. '
          }
        />,
      );
      if (identityType === 'organizations') {
        setPrimaryBtn({ display: true, label: 'Confirm', action: hadleHireVolunteer });
        setSecondaryBtn({ display: true, label: 'Cancel', action: withdrawOfferByOP });
      }
      return;
    }

    if (contract.mission?.status === 'COMPLETE') {
      //completed by Umaya, waiting fot OP confirmation
      setAlertMsg(
        <AlertMessage
          theme="warning"
          iconName="alert-circle"
          title={identityType === 'users' ? 'Completion submitted' : 'Awaiting confirmation'}
          subtitle={
            identityType === 'users'
              ? `Awaiting confirmation from <b>${name}</b>`
              : `<b>${name}</b> has marked this job completed. Confirm so they can receive payment.`
          }
        />,
      );

      if (identityType === 'organizations') {
        setPrimaryBtn({ display: true, label: 'Confirm completion', action: () => setOpenAlert(true) });
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
      return;
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
      title: `${name}'s profile`,
      onClick: () => {
        navigateToProfile(username, type as UserType);
      },
    },
    {
      iconName: 'message-alert-circle',
      title: 'Initiate a dispute',
      // TODO: add open dispute modal
      onClick: () => {
        console.log('TODO: add open dispute modal');
      },
    },
  ];
  return { onConfirm, primaryBtn, secondaryBtn, alertMsg, openAlert, setOpenAlert, displayDispute, menuItems };
};
