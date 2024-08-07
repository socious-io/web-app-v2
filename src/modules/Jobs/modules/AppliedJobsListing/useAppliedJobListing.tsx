import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Applicant, Skill, skills, userApplicants } from 'src/core/api';
import { RootState } from 'src/store';
import { setSkills } from 'src/store/reducers/skills.reducer';

export const useAppliedJobListing = () => {
  const skillList = useSelector<RootState, Skill[]>(state => {
    return state.skills.items;
  });
  const dispatch = useDispatch();
  const PER_PAGE = 10;
  const [appliedList, setAppliedList] = useState<Applicant[]>([] as Applicant[]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchParam] = useSearchParams();
  const pageNumber = Number(searchParam.get('page') || 1);
  const [page, setPage] = useState<number>(pageNumber);
  const [loading, setLoading] = useState(true);
  const [scrollIndex, setscrollIndex] = useState(Number(searchParam.get('scrollIndex') || -1));
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const executeScroll = () => scrollRef.current && scrollRef.current.scrollIntoView();

  const navigate = useNavigate();

  const loadPage = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchMore(), getSkills()]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMore = async () => {
    const data = await userApplicants({ page, status: 'PENDING', limit: PER_PAGE });
    setTotalCount(data.total_count);
    setAppliedList(data.items);
  };

  const getSkills = async () => {
    if (skillList.length) return;
    const res = await skills({ limit: 500 });
    dispatch(setSkills(res.items));
  };

  useEffect(() => {
    localStorage.setItem('source', 'applied');
    localStorage.removeItem('navigateToSearch');
    loadPage();
    if (page !== pageNumber) navigate(`/jobs/applied?page=${page}`);
  }, [page]);

  useEffect(() => {
    if (!loading) executeScroll();
  }, [loading]);

  return {
    page,
    setPage,
    appliedList,
    totalCount,
    PER_PAGE,
    skillList,
    loading,
    scrollRef,
    scrollIndex,
  };
};
