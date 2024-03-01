import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';
import { Organization } from 'src/core/api';
import { About } from 'src/Nowruz/modules/userProfile/components/about';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useOrgProfile = () => {
  const location = useLocation();
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const { organization } = useLoaderData() as { organization: Organization };
  dispatch(setIdentity(organization));
  dispatch(setIdentityType('organizations'));

  useEffect(() => {
    if (location.pathname.includes(`/jobs`)) {
      setActive(1);
    }
  }, [location]);

  const tabs = [
    { label: 'About', content: <About /> },
    { label: 'Jobs', content: <></> },
  ];

  return { tabs, active };
};
