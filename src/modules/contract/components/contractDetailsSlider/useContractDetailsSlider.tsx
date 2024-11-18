import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Contract, CurrentIdentity, connectionStatus } from 'src/core/api';
import { ConnectStatus } from 'src/core/types';
import { getIdentityMeta, translate } from 'src/core/utils';
import { RootState } from 'src/store';

import { ContractDetailTab } from '../contractDetailTab';
import { SliderAwaiting } from '../sliderAwaiting';
import { SliderCompleted } from '../sliderCompleted';
import { SliderDefault } from '../sliderDefault';
import { SliderOfferReceived } from '../sliderOfferReceived';
import { SliderOfferSent } from '../sliderOfferSent';
import { SliderOngoing } from '../sliderOngoing';
import { SliderPaymentRequired } from '../sliderPaymentRequired';

export const useContractDetailsSlider = () => {
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const identityType = identity?.type;

  const navigate = useNavigate();
  const selectedOfferId = useSelector<RootState, string | undefined>(state => {
    return state.contracts.selectedOfferId;
  });
  const contract = useSelector<RootState, Contract | undefined>(state => {
    return state.contracts.offers.find(item => item.id === selectedOfferId);
  });

  const checkMessageButtonStatus = async () => {
    if (identityType === 'organizations') {
      return false;
    }
    let res:
      | {
          status: ConnectStatus;
        }
      | undefined = undefined;
    if (contract?.organization.id) res = (await connectionStatus(contract?.organization.id)).connect;
    return !res;
  };

  const { name, profileImage, type } = getIdentityMeta(
    identityType === 'users' ? contract?.offerer : contract?.recipient,
  );

  const tabs = [
    { label: 'Details', content: <ContractDetailTab contract={contract!} /> },
    // { label: 'Activity', content: <div /> },
  ];

  const [sliderComponent, setSliderComponent] = useState<ReactNode>();

  useEffect(() => {
    const initialize = async () => {
      const disableMessageButton = await checkMessageButtonStatus();
      initializeComponent(disableMessageButton);
    };
    initialize();
  }, [contract]);

  const initializeComponent = async (disabledMessageButton: boolean) => {
    let alertMsg = '';
    switch (contract?.contractStatus) {
      case 'Offer sent':
        setSliderComponent(
          <SliderOfferSent
            contract={contract}
            disableMessage={disabledMessageButton}
            redirectToChat={redirectToChat}
          />,
        );
        break;
      case 'Offer received':
        setSliderComponent(
          <SliderOfferReceived
            contract={contract}
            disableMessage={disabledMessageButton}
            redirectToChat={redirectToChat}
          />,
        );
        break;
      case 'Awaiting confirmation':
        setSliderComponent(
          <SliderAwaiting contract={contract} disableMessage={disabledMessageButton} redirectToChat={redirectToChat} />,
        );
        break;
      case 'Withdrawn':
        setSliderComponent(
          <SliderDefault
            disableMessage={disabledMessageButton}
            redirectToChat={redirectToChat}
            alertMessage={
              identityType === 'users'
                ? translate('cont-declined-offer')
                : translate('cont-user-declined-offer', { name: name })
            }
          />,
        );
        break;
      case 'Payment required':
        setSliderComponent(
          <SliderPaymentRequired
            contract={contract}
            disableMessage={disabledMessageButton}
            redirectToChat={redirectToChat}
          />,
        );
        break;
      case 'Ongoing':
        setSliderComponent(
          <SliderOngoing contract={contract} disableMessage={disabledMessageButton} redirectToChat={redirectToChat} />,
        );
        break;
      case 'Kicked out':
        setSliderComponent(
          <SliderDefault
            disableMessage={disabledMessageButton}
            redirectToChat={redirectToChat}
            alertMessage={
              identityType === 'users' ? translate('cont-user-stopped', { name: name }) : translate('cont-stop')
            }
          />,
        );
        break;

      case 'Canceled':
        if (contract.mission?.status === 'CANCELED')
          alertMsg =
            identityType === 'users'
              ? translate('cont-cancel-contract')
              : translate('cont-user-cancel-contract', { name: name });
        else if (contract.status === 'CANCELED')
          alertMsg = identityType === 'users' ? translate('cont-user-cancel-offer') : translate('cont-cancel-offer');
        setSliderComponent(
          <SliderDefault
            disableMessage={disabledMessageButton}
            redirectToChat={redirectToChat}
            alertMessage={alertMsg}
          />,
        );
        break;
      case 'Completed':
        setSliderComponent(
          <SliderCompleted
            contract={contract}
            disableMessage={disabledMessageButton}
            redirectToChat={redirectToChat}
          />,
        );
        break;
      default:
        setSliderComponent(<div />);
    }
  };

  const redirectToChat = () => {
    const participantId = identityType === 'users' ? contract?.offerer.meta.id : contract?.recipient.meta.id;
    navigate(`../chats?participantId=${participantId}`);
  };

  const navigateToHomePage = () => {
    if (identityType === 'users') {
      const { usernameVal } = getIdentityMeta(contract.offerer);
      navigate(`/profile/organizations/${usernameVal}/view`);
    } else {
      const { usernameVal } = getIdentityMeta(contract.recipient);
      navigate(`/profile/users/${usernameVal}/view`);
    }
  };

  return {
    name,
    profileImage,
    type,
    tabs,
    sliderComponent,
    contract,
    navigateToHomePage,
  };
};
