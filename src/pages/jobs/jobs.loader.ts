import { getIdentities } from 'src/core/api';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import store from 'src/store/store';

export async function jobsPageLoader() {
  try {
    const resp = await getIdentities();
    store.dispatch(setIdentityList(resp));
    return resp;
  } catch {
    // window.location.replace('/intro');
    return {};
  }
}
