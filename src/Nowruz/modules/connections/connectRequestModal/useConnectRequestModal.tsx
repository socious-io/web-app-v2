import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectRequest } from 'src/core/api';
import { setConnectionStatus } from 'src/store/reducers/profile.reducer';

export const useConnectRequestModal = (identityId: string, handleClose: () => void) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [letterCount, setLetterCount] = useState(0);
  const dispatch = useDispatch();

  const handleConnect = async () => {
    try {
      if (error) return;
      const res = await connectRequest(identityId, { text: message });
      const payload = { connection_id: res.id, connection_status: res.status, follower: false, following: false };
      await dispatch(setConnectionStatus(payload));
    } catch (e) {
      console.log('error in connect request', e);
    }
    handleClose();
  };

  const handleChangeMessage = (text: string) => {
    setMessage(text);
    setLetterCount(text.length);
    if (text.length > 300) setError('Too long');
    else setError('');
  };

  return { message, handleConnect, letterCount, error, handleChangeMessage };
};
