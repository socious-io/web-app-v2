import { identities } from 'src/core/api';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export async function jobsPageLoader() {
  try {
    const resp = await identities();
    store.dispatch(setIdentityList(resp));
    return resp;
  } catch {
    // window.location.replace('/intro');
    return {};
  }
}
