import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Contract, CurrentIdentity, connectionStatus } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
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
  const contract = useSelector<RootState, Contract>(state => {
    return state.contracts.offers.find(item => item.id === selectedOfferId);
  });

  const checkMessageButtonStatus = async () => {
    if (identityType === 'organizations') {
      return false;
    }

    const res = (await connectionStatus(contract?.organization.id)).connect;
    return !res;
  };

  const { name, profileImage, type } = getIdentityMeta(
    identityType === 'users' ? contract.offerer : contract.recipient,
  );

  const tabs = [
    { label: 'Details', content: <ContractDetailTab contract={contract} /> },
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
    switch (contract.contractStatus) {
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
            alertMessage={identityType === 'users' ? 'you have declined this offer' : `${name} has declined this offer`}
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
              identityType === 'users' ? `${name} have stopped this contract` : 'You have stopped this contract'
            }
          />,
        );
        break;

      case 'Canceled':
        if (contract.mission?.status === 'CANCELED')
          alertMsg =
            identityType === 'users' ? 'You have canceled this contract' : `${name} has canceled this contract`;
        else if (contract.status === 'CANCELED')
          alertMsg = identityType === 'users' ? `${name} has canceled this offer` : 'You have canceled this offer';
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
    const participantId = identityType === 'users' ? contract.offerer.meta.id : contract.recipient.meta.id;
    navigate(`../chats?participantId=${participantId}`);
  };
  return {
    name,
    profileImage,
    type,
    tabs,
    sliderComponent,
    contract,
  };
};
