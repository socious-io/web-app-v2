import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Job, JobsRes, Skill, jobs, markedJobs, skills } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { useIsMount } from 'src/modules/general/components/useIsMount';
import { RootState } from 'src/store';
import { setSkills } from 'src/store/reducers/skills.reducer';

export const useSavedJobListing = () => {
  const loaderData = useLoaderData() as JobsRes;
  const navigate = useNavigate();
  const skillList = useSelector<RootState, Skill[]>(state => {
    return state.skills.items;
  });
  const dispatch = useDispatch();
  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [jobsList, setJobsList] = useState<Job[]>(loaderData.items);
  const [totalCount, setTotalCount] = useState(loaderData.total_count);
  const [searchParam] = useSearchParams();
  const pageNumber = Number(searchParam.get('page') || 1);
  const [page, setPage] = useState(pageNumber);
  const [scrollIndex, setscrollIndex] = useState(Number(searchParam.get('scrollIndex') || -1));
  const [loading, setLoading] = useState(false);
  const prevPage = useRef(1);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const executeScroll = () => scrollRef.current && scrollRef.current.scrollIntoView();

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      await Promise.all([fetchMore(page), getSkills()]);
    } catch (error) {
      console.log('error in page load', error);
    }
    setLoading(false);
  };

  const fetchMore = async (page: number) => {
    try {
      if (prevPage.current === page - 1) {
        const data = await markedJobs({ page: page, 'filter.marked_as': 'SAVE', limit: PER_PAGE });
        setTotalCount(data.total_count);
        setJobsList([...jobsList, ...data.items]);
      } else {
        const data = await markedJobs({ page: page, 'filter.marked_as': 'SAVE', limit: PER_PAGE * page });
        setJobsList(data.items);
        setTotalCount(data.total_count);
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
    localStorage.setItem('source', 'saved');
    if (isMobile) loadPage(page);
    else if (page !== pageNumber) navigate(`/jobs/saved?page=${page}`);
  }, [page]);

  useEffect(() => {
    setJobsList(loaderData.items);
    setTotalCount(loaderData.total_count);
  }, [loaderData]);

  useEffect(() => {
    if (!loading) executeScroll();
  }, [loading]);

  const handleChangeMobilePage = () => {
    prevPage.current = page;
    setPage(page + 1);
    setscrollIndex(page * PER_PAGE - 1);
  };
  return {
    page,
    setPage,
    jobsList,
    total: totalCount,
    PER_PAGE,
    isMobile,
    skillList,
    loading,
    loadPage,
    scrollRef,
    scrollIndex,
    handleChangeMobilePage,
  };
};
