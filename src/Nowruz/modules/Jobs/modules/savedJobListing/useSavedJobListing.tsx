import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useLocation } from 'react-router-dom';
import { Job, JobsRes, Skill, jobs, markedJobs, skills } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { useIsMount } from 'src/Nowruz/modules/general/components/useIsMount';
import { RootState } from 'src/store';
import { setSkills } from 'src/store/reducers/skills.reducer';

export const useSavedJobListing = () => {
  const loaderData = useLoaderData() as JobsRes;
  const skillList = useSelector<RootState, Skill[]>(state => {
    return state.skills.items;
  });
  5;
  const dispatch = useDispatch();
  const PER_PAGE = 5;
  const isMobile = isTouchDevice();
  const [jobsList, setJobsList] = useState<Job[]>(loaderData.items);
  const [totalCount, setTotalCount] = useState(loaderData.total_count);
  const pageNumber = Number(loaderData.page);
  const [page, setPage] = useState(pageNumber);
  const [loading, setLoading] = useState(true);
  const isMount = useIsMount();

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      await Promise.all([fetchMore(page), getSkills()]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMore = async (page: number) => {
    try {
      if (!isMount) {
        const data = await markedJobs({ page: page, 'filter.marked_as': 'SAVE', limit: PER_PAGE });
        setTotalCount(data.total_count);
        if (isMobile && page > 1) setJobsList([...jobsList, ...data.items]);
        else setJobsList(data.items);
      }
    } catch (e) {
      console.log('error in fetching saved jobs', e);
    }
  };

  const getSkills = async () => {
    if (skillList.length) return;
    const res = await skills({ limit: 500 });
    await dispatch(setSkills(res.items));
  };

  useEffect(() => {
    loadPage(page);
    localStorage.setItem('page', page.toString());
  }, [page]);

  return { page, setPage, jobsList, total: totalCount, PER_PAGE, isMobile, skillList, loading, loadPage };
};
