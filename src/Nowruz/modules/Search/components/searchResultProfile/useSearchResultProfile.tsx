import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  connectionStatus as connectionStatusAPI,
  connectRequest,
  CurrentIdentity,
  Organization,
  User,
} from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';

export const useSearchResultProfile = (identity?: User | Organization) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) =>
    state.identity.entities.find((identity) => identity.current),
  );
  const { name, profileImage, type, username, website } = getIdentityMeta(identity);
  const coverImageUrl = identity?.cover_image?.url;
  const [buttonLabel, setButtonLabel] = useState('');
  const [displayButton, setDisplayButton] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [letterCount, setLetterCount] = useState(0);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log('test log openModal', openModal);
  //   }, [openModal]);

  const getConnectionStatus = async () => {
    if (!identity?.id) return;
    const res = await connectionStatusAPI(identity.id);
    setDisplayButton(true);
    if (!res.connect) setButtonLabel('Connect');
    if (res.connect?.status === 'BLOCKED') setDisplayButton(false);

    if (res.connect?.status === 'PENDING') {
      if (res.connect.requester?.id === currentIdentity?.id) setButtonLabel('Request sent');
      else setButtonLabel('Connect');
    }

    if (res.connect?.status === 'CONNECTED') setButtonLabel('Message');
  };

  useEffect(() => {
    getConnectionStatus();
  }, []);

  const handleClick = async () => {
    try {
      switch (buttonLabel) {
        case 'Connect':
          setOpenModal(true);
          break;
        case 'Message':
          navigate(`../chats?participantId=${identity?.id}`);
          break;
        default:
          return;
      }
    } catch (e) {
      console.log('Error in button click', e);
    }
  };

  const handleConnect = async () => {
    try {
      if (error || !identity?.id) return;
      await connectRequest(identity.id, { text: message });
      setButtonLabel('Request sent');
      setDisplayButton(true);
    } catch (e) {
      console.log('error in connect request', e);
    }
    setOpenModal(false);
  };

  const handleChangeMessage = (text: string) => {
    setMessage(text);
    setLetterCount(text.length);
    if (text.length > 300) setError('Too long');
    else setError('');
  };

  return {
    name,
    profileImage,
    type,
    username,
    website,
    coverImageUrl,
    displayButton,
    buttonLabel,
    handleClick,
    openModal,
    setOpenModal,
    message,
    error,
    letterCount,
    handleConnect,
    handleChangeMessage,
  };
};
