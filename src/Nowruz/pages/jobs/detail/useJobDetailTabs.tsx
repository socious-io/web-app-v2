import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Applicant, ApplicantsRes, Job, jobApplicants } from 'src/core/api';
import Badge from 'src/Nowruz/modules/general/components/Badge';
import { JobDetailAbout } from 'src/Nowruz/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/Nowruz/modules/Jobs/components/jobDetailDescription';

import { Cards } from './applicants/cards';
import { Table } from './applicants/table';
import css from './jobDetail.module.scss';

export const useJobDetailTabs = (jobDetail: Job, isUser: boolean) => {
  const PER_PAGE = 10;
  const initialVal: ApplicantsRes = {
    items: [] as Applicant[],
    page: 1,
    limit: PER_PAGE,
    total_count: 0,
  };
  const [pending, setPending] = useState<ApplicantsRes>(initialVal);
  const [rejected, setRejected] = useState<ApplicantsRes>(initialVal);
  const [offered, setOffered] = useState<ApplicantsRes>(initialVal);
  const [refetch, setRefetch] = useState(false);

  const overviewJSX = () => {
    return (
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className={css.description}>
          <JobDetailDescription jobDescription={jobDetail.description} />
        </div>
        <div className="md:mr-16">
          <JobDetailAbout isUser={isUser} />
        </div>
      </div>
    );
  };

  const applicantsJSX = useCallback((data: ApplicantsRes, tab: string) => {
    return (
      <>
        <Cards applicants={data} currentTab={tab} onRefetch={setRefetch} jobId={jobDetail.id} />
        <Table applicants={data} currentTab={tab} onRefetch={setRefetch} jobId={jobDetail.id} />
      </>
    );
  }, []);

  const tabs = useMemo(() => {
    const applicantsCount = pending.items;

    return [
      {
        label: 'Overview',
        content: overviewJSX(),
      },
      {
        label: (
          <>
            Applicants
            {!!applicantsCount.length && (
              <div className="ml-2 hidden md:block">
                <Badge content={applicantsCount.length.toString()} />
              </div>
            )}
          </>
        ),
        content: applicantsJSX(pending, 'applicants'),
      },
      { label: 'Offered', content: applicantsJSX(offered, 'offered') },
      { label: 'Rejected', content: applicantsJSX(rejected, 'rejected') },
    ];
  }, [offered, rejected, pending, applicantsJSX]);

  const getApplicants = useCallback(async () => {
    const requests = [
      jobApplicants(jobDetail.id, { page: 1, limit: PER_PAGE, status: 'PENDING' }),
      jobApplicants(jobDetail.id, { page: 1, limit: PER_PAGE, status: 'OFFERED,APPROVED,HIRED,CLOSED' }),
      jobApplicants(jobDetail.id, { page: 1, limit: PER_PAGE, status: 'REJECTED' }),
    ];
    const [pendingRes, offeredRes, rejectedRes] = await Promise.all(requests);

    setPending(pendingRes);
    setOffered(offeredRes);
    setRejected(rejectedRes);
  }, [jobDetail.id]);

  useEffect(() => {
    if (jobDetail.id || refetch === true) {
      getApplicants().then(() => {
        setRefetch(false);
      });
    }
  }, [getApplicants, jobDetail, refetch]);

  return {
    tabs,
    setRefetch,
  };
};
