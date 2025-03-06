import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';
import { CurrentIdentity, JobsRes, OrganizationProfile } from 'src/core/api';
import { translate } from 'src/core/utils';
import Badge from 'src/modules/general/components/Badge';
import OrgPreferences from 'src/modules/Preferences/OrgPreferences';
import ReviewsList from 'src/modules/Reviews/containers/ReviewsList';
import { About } from 'src/modules/userProfile/components/about';
import { OrganizationJobs } from 'src/modules/userProfile/components/jobs';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useOrgProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { organization, orgJobs } = useLoaderData() as {
    organization: OrganizationProfile;
    orgJobs: JobsRes;
  };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const [active, setActive] = useState(0);
  const totalJobs = orgJobs?.total_count || 0;
  const myProfile = currentIdentity?.id === organization?.id;

  dispatch(setIdentity(organization));
  dispatch(setIdentityType('organizations'));

  useEffect(() => {
    if (location.pathname.includes(`/jobs`)) {
      setActive(1);
    }
  }, [location]);

  const tabs = [
    { label: translate('org-profile.about'), content: <About onOpenPreferences={() => setActive(2)} /> },
    {
      label: (
        <>
          <span className="mr-2">{translate('org-profile.jobs')}</span>
          {!!totalJobs && <Badge content={totalJobs.toString()} />}
        </>
      ),
      content: <OrganizationJobs />,
    },
    ...(myProfile ? [{ label: translate('org-profile.preferences'), content: <OrgPreferences /> }] : []),
    { label: translate('org-profile.reviews'), content: <ReviewsList /> },
  ];

  return { tabs, active, setActive };
};
