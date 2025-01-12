import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Contract } from 'src/core/adaptors';
import { CurrentIdentity, connectionStatus } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import ContractDetailTab from 'src/modules/Contract/components/ContractDetailTab';
import { RootState } from 'src/store';

export const useContractDetailsSlider = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const identityType = identity?.type;
  const currentIdentityId = identity?.id;
  const selectedOfferId = useSelector<RootState, string | undefined>(state => {
    return state.contracts.selectedOfferId;
  });
  const contract = useSelector<RootState, Contract | undefined>(state => {
    return state.contracts.list.find(item => item.id === selectedOfferId);
  });
  const {
    name: partnerName,
    profileImage: partnerProfileImage,
    usernameVal: partnerUsernameVal,
    type: partnerType,
  } = getIdentityMeta(contract?.partner);
  const partnerId = contract?.partner?.id;
  const [disabledMessageButton, setDisableMessageButton] = useState(false);
  const currentIdentityIsClient = currentIdentityId === contract?.clientId;

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

  const redirectToChat = () => navigate(`../chats?participantId=${partnerId}`);

  const navigateToHomePage = () => navigate(`/profile/${partnerType}/${partnerUsernameVal}/view`);

  return {
    data: {
      partnerName,
      partnerProfileImage,
      partnerType,
      contract,
      tabs,
      disabledMessageButton,
      currentIdentityIsClient,
    },
    operations: { navigateToHomePage, redirectToChat },
  };
};
