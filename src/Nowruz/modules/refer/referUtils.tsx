import { checkVerification, requestVerification } from 'src/core/api';
import store from 'src/store';
import { currentIdentities } from 'src/store/thunks/identity.thunks';

export const verifyAction = async (
  setConnectUrl: (val: string) => void,
  setOpenVerifyModal: (val: boolean) => void,
) => {
  const vc = await requestVerification();
  setConnectUrl(vc.connection_url);
  setOpenVerifyModal(true);

  const interval = setInterval(async () => {
    const res = await checkVerification();

    if (res.verified) {
      await store.dispatch(currentIdentities());
      clearInterval(interval);
      setOpenVerifyModal(false);
    }
  }, 5000);

  setTimeout(() => {
    clearInterval(interval);
  }, 120000);
};
