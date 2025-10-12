import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { CurrentIdentity, JobsRes, Organization } from 'src/core/api';
import { translate } from 'src/core/utils';
import Badge from 'src/modules/general/components/Badge';
import OrgPreferences from 'src/modules/Preferences/OrgPreferences';
import ReviewsList from 'src/modules/Reviews/containers/ReviewsList';
import { About } from 'src/modules/userProfile/components/about';
import { OrganizationJobs } from 'src/modules/userProfile/components/jobs';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useOrgProfile = () => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const dispatch = useDispatch();
  const { organization, orgJobs } = useLoaderData() as { organization: Organization; orgJobs: JobsRes };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const totalJobs = orgJobs?.total_count || 0;
  const myProfile = currentIdentity?.id === organization?.id;

  useLayoutEffect(() => {
    dispatch(setIdentity(organization));
    dispatch(setIdentityType('organizations'));
  }, [dispatch, organization]);

  useEffect(() => {
    if (pathname.includes(`/jobs`)) {
      setActiveTab(1);
    }
  }, [pathname]);

  const tabs = [
    { label: translate('org-profile.about'), content: <About onOpenPreferences={() => setActiveTab(2)} /> },
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

  const activeTabIndexes = {
    '#about': 0,
    '#jobs': 1,
    '#preferences': 2,
    '#reviews': 3,
  };

  const setActiveTab = (index: number) => {
    const activeKey = Object.keys(activeTabIndexes).find(key => activeTabIndexes[key] === index);
    activeKey && navigate(activeKey);
  };

  return {
    data: {
      tabs,
      activeTabIndex: activeTabIndexes[hash] || 0,
    },
    operations: {
      setActiveTab,
    },
  };
};
