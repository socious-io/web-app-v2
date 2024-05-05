import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { Job, JobMark, markJob } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useJobListingCard = (job: Job) => {
  const path = useLocation().pathname;
  const savedPage = path.includes('saved');
  const jobListingPage = path.endsWith('jobs');

  const [skills, setSkills] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const getOptionsFromValues = (
    values: string[],
    options: {
      value: string;
      label: string;
    }[],
  ) => options.filter(option => values.includes(option.value));

  useEffect(() => {
    if (job.skills)
      skillsToCategoryAdaptor().then(data => {
        setSkills(getOptionsFromValues(job.skills || [], data));
      });
  }, [job]);
  const navigate = useNavigate();
  const handleClick = () => {
    if (isTouchDevice()) navigate(`/jobs/${job.id}`);
  };
  const handleTitleClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  const handleMarkJob = async (mark: JobMark) => {
    try {
      await markJob(job.id, mark);
    } catch (e) {
      console.log('error in saving job', e);
    }
  };

  return { skills, handleTitleClick, handleClick, handleMarkJob, savedPage, jobListingPage };
};
