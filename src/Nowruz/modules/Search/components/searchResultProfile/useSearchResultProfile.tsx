import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectionStatus as connectionStatusAPI, connectRequest, Organization, User } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';

export const useSearchResultProfile = (identity?: User | Organization) => {
  const { name, profileImage, type, username, website } = getIdentityMeta(identity);
  const coverImageUrl = identity?.cover_image?.url;
  const [buttonLabel, setButtonLabel] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [letterCount, setLetterCount] = useState(0);

  const navigate = useNavigate();

  const getConnectionStatus = async () => {
    if (!identity?.id) return;
    const res = await connectionStatusAPI(identity.id);

    if (!res.connect) setButtonLabel('Connect');
    else if (res.connect?.status === 'BLOCKED') setButtonLabel('');
    else if (res.connect?.status === 'PENDING') setButtonLabel('Request sent');
    else if (res.connect?.status === 'CONNECTED') setButtonLabel('Message');
  };

  useEffect(() => {
    getConnectionStatus();
  }, []);

  const handleClick = () => {
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
