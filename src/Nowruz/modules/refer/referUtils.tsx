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

  /* TODO: as flow may change this is temp solution
              we may call checkVerification method on init depend on Identity verification_status
            */
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
