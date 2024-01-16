import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Organization } from 'src/core/api';
import { About } from 'src/Nowruz/modules/userProfile/components/about';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useOrgProfile = () => {
  const dispatch = useDispatch();
  const { organization } = useLoaderData() as { organization: Organization };
  dispatch(setIdentity(organization));
  dispatch(setIdentityType('organizations'));

  const tabs = [{ label: 'About', content: <About /> }];

  return { tabs };
};
