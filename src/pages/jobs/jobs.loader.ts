import { getIdentities } from 'src/core/api';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { location } from '../../core/routes/config.routes';
import store from 'src/store/store';

export async function jobsLoader() {
  try {
    const resp = await getIdentities();
    store.dispatch(setIdentityList(resp));
    return resp;
  } catch {
    const next = location.buildNext('/intro', { to: '/intro' });
    location.navigate(next);
    return {};
  }
}
