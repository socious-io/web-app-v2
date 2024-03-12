import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Applicant, Skill, skills, userApplicants } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';
import { setSkills } from 'src/store/reducers/skills.reducer';

export const useAppliedJobListing = () => {
  const skillList = useSelector<RootState, Skill[]>((state) => {
    return state.skills.items;
  });
  const dispatch = useDispatch();
  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [applicants, setApplicants] = useState<Applicant[]>([] as Applicant[]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(Number(localStorage.getItem('appliedJobPage')) ?? 1);
  const [loading, setLoading] = useState(true);

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
    const currentPage = Number(localStorage.getItem('appliedJobPage')) ?? 1;
    const data = await userApplicants({ page: currentPage, status: 'PENDING', limit: PER_PAGE });
    setPage(data.page);
    setTotalCount(data.total_count);
    if (isMobile && page > 1) setApplicants([...applicants, ...data.items]);
    else setApplicants(data.items);
  };

  const getSkills = async () => {
    if (skillList.length) return;
    const res = await skills({ limit: 500 });
    dispatch(setSkills(res.items));
  };

  useEffect(() => {
    localStorage.setItem('source', 'applied');
    localStorage.setItem('appliedJobPage', page.toString());
    localStorage.removeItem('navigateToSearch');
    loadPage();
  }, [page]);

  return { page, setPage, applicants, totalCount, PER_PAGE, skillList, loading };
};
