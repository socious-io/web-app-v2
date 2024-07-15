import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { RootState } from 'src/store';

export const useTopBannerNotVerified = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const type = currentIdentity?.type;
  const [connectUrl, setConnectUrl] = useState('');
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  return { connectUrl, setConnectUrl, openVerifyModal, setOpenVerifyModal, type };
};
