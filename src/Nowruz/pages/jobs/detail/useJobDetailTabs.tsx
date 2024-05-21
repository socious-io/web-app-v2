import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Applicant, Job, jobApplicants } from 'src/core/api';
import Badge from 'src/Nowruz/modules/general/components/Badge';
import { JobDetailAbout } from 'src/Nowruz/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/Nowruz/modules/Jobs/components/jobDetailDescription';

import { Cards } from './applicants/cards';
import { Table } from './applicants/table';
import css from './jobDetail.module.scss';

export const useJobDetailTabs = (jobDetail: Job, isUser: boolean) => {
  const [applicants, setApplicants] = useState([] as Applicant[]);
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

  const applicantsJSX = useCallback((data: Array<Applicant>, tab: string) => {
    const status: Array<string> = [];
    if (tab === 'applicants') {
      status.push('PENDING');
    }
    if (tab === 'offered') {
      status.push('OFFERED', 'APPROVED');
    }
    if (tab === 'rejected') {
      status.push('REJECTED');
    }
    const activeData = data.filter(applicant => status.includes(applicant.status));
    return (
      <>
        <Cards applicants={activeData} currentTab={tab} onRefetch={setRefetch} />
        <Table applicants={activeData} currentTab={tab} onRefetch={setRefetch} />
      </>
    );
  }, []);

  const tabs = useMemo(() => {
    const applicantsCount = applicants.filter(a => a.status === 'PENDING');
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
        content: applicantsJSX(applicants, 'applicants'),
      },
      { label: 'Offered', content: applicantsJSX(applicants, 'offered') },
      { label: 'Rejected', content: applicantsJSX(applicants, 'rejected') },
    ];
  }, [applicants, applicantsJSX]);

  const getApplicants = useCallback(async () => {
    const data = await jobApplicants(jobDetail.id, { page: 1, limit: 100 });
    setApplicants(data.items);
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
