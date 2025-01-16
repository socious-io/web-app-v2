import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Contract } from 'src/core/adaptors';
import { CurrentIdentity, connectionStatus } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';

import ContractDetailTab from '../ContractDetailTab';

export const useContractDetailsSlider = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const identityType = identity?.type;
  const selectedOfferId = useSelector<RootState, string | undefined>(state => {
    return state.contracts.selectedOfferId;
  });
  const contract = useSelector<RootState, Contract | undefined>(state => {
    return state.contracts.list.find(item => item.id === selectedOfferId);
  });
  const {
    name: partnerName,
    profileImage: partnerProfileImage,
    type: partnerType,
  } = getIdentityMeta(contract?.partner);
  const [disabledMessageButton, setDisableMessageButton] = useState(false);

  const tabs = [
    { label: 'Details', content: <ContractDetailTab contract={contract!} /> },
    // { label: 'Activity', content: <div /> },
  ];

  useEffect(() => {
    const fetchMessageButtonStatus = async () => {
      if (identityType === 'organizations') {
        setDisableMessageButton(false);
      } else {
        const { connect } = await connectionStatus(contract?.partner?.id || '');
        setDisableMessageButton(!connect);
      }
    };
    if (contract) {
      fetchMessageButtonStatus();
    }
  }, [contract, identityType]);

  // const initializeComponent = async (disabledMessageButton: boolean) => {
  //   switch (contract?.semanticStatus) {
  //     case 'Offer sent':
  //       setSliderComponent(
  //         <SliderOfferSent
  //           contract={contract}
  //           disableMessage={disabledMessageButton}
  //           redirectToChat={redirectToChat}
  //         />,
  //       );
  //       break;
  //     case 'Offer received':
  //       setSliderComponent(
  //         <SliderOfferReceived
  //           contract={contract}
  //           disableMessage={disabledMessageButton}
  //           redirectToChat={redirectToChat}
  //         />,
  //       );
  //       break;
  //     // case 'Awaiting confirmation':
  //     //   setSliderComponent(
  //     //     <SliderAwaiting contract={contract} disableMessage={disabledMessageButton} redirectToChat={redirectToChat} />,
  //     //   );
  //     //   break;
  //     // case 'Withdrawn':
  //     //   setSliderComponent(
  //     //     <SliderDefault
  //     //       disableMessage={disabledMessageButton}
  //     //       redirectToChat={redirectToChat}
  //     //       alertMessage={
  //     //         identityType === 'users'
  //     //           ? translate('cont-declined-offer')
  //     //           : translate('cont-user-declined-offer', { name: name })
  //     //       }
  //     //     />,
  //     //   );
  //     //   break;
  //     // case 'Payment required':
  //     //   setSliderComponent(
  //     //     <SliderPaymentRequired
  //     //       contract={contract}
  //     //       disableMessage={disabledMessageButton}
  //     //       redirectToChat={redirectToChat}
  //     //     />,
  //     //   );
  //     //   break;
  //     // case 'Ongoing':
  //     //   setSliderComponent(
  //     //     <SliderOngoing contract={contract} disableMessage={disabledMessageButton} redirectToChat={redirectToChat} />,
  //     //   );
  //     //   break;
  //     // case 'Kicked out':
  //     //   setSliderComponent(
  //     //     <SliderDefault
  //     //       disableMessage={disabledMessageButton}
  //     //       redirectToChat={redirectToChat}
  //     //       alertMessage={
  //     //         identityType === 'users' ? translate('cont-user-stopped', { name: name }) : translate('cont-stop')
  //     //       }
  //     //     />,
  //     //   );
  //     //   break;

  //     // case 'Canceled':
  //     //   if (contract.mission?.status === 'CANCELED')
  //     //     alertMsg =
  //     //       identityType === 'users'
  //     //         ? translate('cont-cancel-contract')
  //     //         : translate('cont-user-cancel-contract', { name: name });
  //     //   else if (contract.status === 'CANCELED')
  //     //     alertMsg = identityType === 'users' ? translate('cont-user-cancel-offer') : translate('cont-cancel-offer');
  //     //   setSliderComponent(
  //     //     <SliderDefault
  //     //       disableMessage={disabledMessageButton}
  //     //       redirectToChat={redirectToChat}
  //     //       alertMessage={alertMsg}
  //     //     />,
  //     //   );
  //     //   break;
  //     // case 'Completed':
  //     //   setSliderComponent(
  //     //     <SliderCompleted
  //     //       contract={contract}
  //     //       disableMessage={disabledMessageButton}
  //     //       redirectToChat={redirectToChat}
  //     //     />,
  //     //   );
  //     // break;
  //     default:
  //       setSliderComponent(<div />);
  //   }
  // };

  const redirectToChat = () => {
    // const participantId = identityType === 'users' ? contract?.offerer.meta.id : contract?.recipient.meta.id;
    // navigate(`../chats?participantId=${participantId}`);
  };

  const navigateToHomePage = () => {
    // if (identityType === 'users') {
    //   const { usernameVal } = getIdentityMeta(contract.offerer);
    //   navigate(`/profile/organizations/${usernameVal}/view`);
    // } else {
    //   const { usernameVal } = getIdentityMeta(contract.recipient);
    //   navigate(`/profile/users/${usernameVal}/view`);
    // }
  };

  return {
    data: { partnerName, partnerProfileImage, partnerType, contract, tabs, disabledMessageButton },
    operations: { navigateToHomePage, redirectToChat },
  };
};
