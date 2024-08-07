import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';
import { JobsRes, OrganizationProfile } from 'src/core/api';
import Badge from 'src/modules/general/components/Badge';
import OrgPreferences from 'src/modules/preferences/OrgPreferences';
import { ValueContainer } from 'src/modules/preferences/valueContainer';
import { About } from 'src/modules/userProfile/components/about';
import { OrganizationJobs } from 'src/modules/userProfile/components/jobs';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useOrgProfile = () => {
  const location = useLocation();
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const { organization, orgJobs } = useLoaderData() as { organization: OrganizationProfile; orgJobs: JobsRes };
  const totalJobs = orgJobs?.total_count || 0;

  dispatch(setIdentity(organization));
  dispatch(setIdentityType('organizations'));

  useEffect(() => {
    if (location.pathname.includes(`/jobs`)) {
      setActive(1);
    }
  }, [location]);

  const tabs = [
    { label: 'About', content: <About onOpenPreferences={() => setActive(2)} /> },
    {
      label: (
        <>
          <span className="mr-2">Jobs</span>
          {!!totalJobs && <Badge content={totalJobs.toString()} />}
        </>
      ),
      content: <OrganizationJobs />,
    },
    { label: 'Preferences', content: <OrgPreferences /> },
  ];

  return { tabs, active };
};
