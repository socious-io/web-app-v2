import { CSSProperties, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Job } from 'src/components/organisms/job-list/job-list.types';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
// import { endpoint } from 'src/core/endpoints';
import { CurrentIdentity, jobOffers } from 'src/core/api';
import { JobDetailCard } from 'src/pages/job-detail/components/job-detail-card/job-detail-card';
import { getScreeningQuestions } from 'src/pages/job-offer-reject/job-offer-reject.services';
import { getOrganizationDetail } from 'src/pages/profile-organization/refactored/profileOrg.services';
import { getUserDetail } from 'src/pages/profile-user/refactored/profileUser.services';
import OrganizationProfileCard from 'src/pages/search/components/organization-profile-card/organization-profile-card';
import { UserProfileCard } from 'src/pages/search/components/user-profile-card/user-profile-card';
import { RootState } from 'src/store';

import { DetailOutletProps } from './detail-outlet.types';

export function DetailOutlet(props: DetailOutletProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<null | JSX.Element>(null);

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  const location = (job: Job) =>
    `${job.identity_meta.city}, ${getCountryName(
      job.identity_meta.country as keyof typeof COUNTRIES_DICT | undefined,
    )}`;

  useMemo(() => {
    async function getTemplate() {
      if (!props.id) {
        setContent(null);
        return;
      }
      switch (props.type) {
        case 'projects':
          setLoading(true);
          const job = await jobOffers(props.id);
          const { questions } = await getScreeningQuestions(props.id);
          const jobDetailCardJSX = (
            <JobDetailCard
              job={job}
              screeningQuestions={questions}
              location={location(job)}
              userType={currentIdentity?.type || 'users'}
            />
          );
          setContent(jobDetailCardJSX);
          setLoading(false);
          break;
        case 'users':
          setLoading(true);
          const user = await getUserDetail(props.id);
          const jsx = <UserProfileCard user={user} />;
          setContent(jsx);
          setLoading(false);
          break;
        case 'organizations':
          setLoading(true);
          const orgDetails = await getOrganizationDetail(props.id.toLowerCase());
          const orgJsx = <OrganizationProfileCard organization={orgDetails} />;
          setContent(orgJsx);
          setLoading(false);
          break;
      }
    }
    getTemplate();
  }, [props.id]);

  const style: CSSProperties = {
    opacity: loading ? '0.5' : '1',
    width: content ? '40rem' : '0',
    transition: 'all 200ms 0ms',
  };

  return <div style={style}>{content}</div>;
}
