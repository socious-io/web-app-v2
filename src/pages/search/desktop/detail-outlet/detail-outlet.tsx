import { CSSProperties, useMemo, useState } from 'react';
import { endpoint } from 'src/core/endpoints';
import { JobDetailCard } from 'src/pages/job-detail/components/job-detail-card/job-detail-card';
import { getScreeningQuestions } from 'src/pages/job-offer-reject/job-offer-reject.services';
import { DetailOutletProps } from './detail-outlet.types';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { Job } from 'src/components/organisms/job-list/job-list.types';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { IdentityReq } from 'src/core/types';

export function DetailOutlet(props: DetailOutletProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(<>LOADING...</>);

  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
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
      job.identity_meta.country as keyof typeof COUNTRIES_DICT | undefined
    )}`;

  useMemo(() => {
    async function getTemplate() {
      switch (props.type) {
        case 'projects':
          setLoading(true);
          const job = await endpoint.get.projects.project_id(props.id);
          const { questions } = await getScreeningQuestions(props.id);
          const jsx = (
            <JobDetailCard
              job={job}
              screeningQuestions={questions}
              location={location(job)}
              userType={currentIdentity.type}
            />
          );
          setContent(jsx);
          setLoading(false);
      }
    }
    getTemplate();
  }, [props.id]);

  const style: CSSProperties = {
    opacity: loading ? '0.5' : '1',
  };

  return <div style={style}>{content}</div>;
}
