import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectRequest } from 'src/core/api';
import { setConnectionStatus } from 'src/store/reducers/profile.reducer';

export const useConnectRequestModal = (identityId: string, handleClose: () => void) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleConnect = async () => {
    try {
      const res = await connectRequest(identityId, { text: message });
      const payload = { connection_id: res.id, connection_status: res.status, follower: false, following: false };
      await dispatch(setConnectionStatus(payload));
    } catch (e) {
      console.log('error in connect request', e);
    }
    handleClose();
  };

  return { message, setMessage, handleConnect };
};
