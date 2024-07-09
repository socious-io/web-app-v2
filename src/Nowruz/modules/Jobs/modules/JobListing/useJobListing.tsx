import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CurrentIdentity, Job, JobsRes, Skill, UserMeta, jobs, recommendedJobs, skills } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';
import { setSkills } from 'src/store/reducers/skills.reducer';

export const useJobListing = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const loaderData = useLoaderData() as JobsRes;

  const isLoggedIn = !!currentIdentity;
  const skillList = useSelector<RootState, Skill[]>(state => {
    return state.skills.items;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [jobsList, setJobsList] = useState<Job[]>(loaderData?.items || []);
  const [totalCount, setTotalCount] = useState(loaderData?.total_count || 0);
  const [searchParam] = useSearchParams();
  const pageNumber = Number(searchParam.get('page') || 1);
  const [page, setPage] = useState(pageNumber);
  const [scrollIndex, setscrollIndex] = useState(Number(searchParam.get('scrollIndex') || -1));
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState<Job>();
  const prevPage = useRef(1);
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const executeScroll = () => scrollRef.current && scrollRef.current.scrollIntoView();

  const loadPage = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchMore(), getSkills(), getRecommended()]);
    } catch (error) {
      console.log('error in page load', error);
    }
    setLoading(false);
  };

  const fetchMore = async () => {
    try {
      if (prevPage.current === page - 1) {
        // if see more is clicked
        const data = await jobs({ page: page, status: 'ACTIVE', limit: PER_PAGE });
        setTotalCount(data.total_count);
        setJobsList([...jobsList, ...data.items]);
      } else {
        // if page is changed through URL
        const data = await jobs({ page: 1, status: 'ACTIVE', limit: PER_PAGE * page });
        setJobsList(data.items);
        setTotalCount(data.total_count);
      }
    } catch (e) {
      console.log('error in fetching jobs', e);
    }
  };

  const getSkills = async () => {
    if (skillList.length) return;
    try {
      const res = await skills({ limit: 500 });
      await dispatch(setSkills(res.items));
    } catch (e) {
      console.log('error in getting skills', e);
    }
  };

  const getRecommended = async () => {
    try {
      if (!currentIdentity || !!recommended) return;
      setLoading(true);
      const res = await recommendedJobs((currentIdentity.meta as UserMeta).username);
      setRecommended(res.items[0]);
    } catch (e) {
      console.log('error in getting recommended jobs', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isMobile) loadPage();
    else if (page !== pageNumber) navigate(`/jobs?page=${page}`);
  }, [page]);

  useEffect(() => {
    getRecommended();
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
    recommended,
    isLoggedIn,
    scrollRef,
    scrollIndex,
    handleChangeMobilePage,
  };
};
