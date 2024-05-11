import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { Job, JobMark, markJob, removeMark } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useJobListingCard = (job: Job, saveAction?: () => void) => {
  const [jobVal, setJobVal] = useState(job);

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
    if (isTouchDevice() && !jobVal.not_interested) navigate(`/jobs/${job.id}`);
  };
  const handleTitleClick = () => {
    if (!jobVal.not_interested) navigate(`/jobs/${job.id}`);
  };

  const handleBookmark = async () => {
    try {
      if (jobVal.saved) {
        await removeMark(job.id);
        setJobVal({ ...jobVal, saved: false });
        if (saveAction) await saveAction();
      } else {
        await markJob(job.id, 'SAVE');
        setJobVal({ ...jobVal, saved: true });
      }
    } catch (e) {
      console.log('error in bookmark click', e);
    }
  };

  const handleNotInterested = async () => {
    try {
      if (jobVal.saved) {
        await removeMark(job.id);
      }
      await markJob(job.id, 'NOT_INTERESTED');
      setJobVal({ ...jobVal, saved: false, not_interested: true });
    } catch (e) {
      console.log('error in bookmark click', e);
    }
  };

  return { skills, handleTitleClick, handleClick, jobVal, handleBookmark, handleNotInterested };
};
