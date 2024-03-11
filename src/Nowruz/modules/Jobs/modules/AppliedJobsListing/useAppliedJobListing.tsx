import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Applicant, ApplicantsRes, CurrentIdentity, Skill, skills, userApplicants } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { useIsMount } from 'src/Nowruz/modules/general/components/useIsMount';
import { RootState } from 'src/store';
import { setSkills } from 'src/store/reducers/skills.reducer';

export const useAppliedJobListing = () => {
  //const loaderData = useLoaderData() as ApplicantsRes;

  const skillList = useSelector<RootState, Skill[]>((state) => {
    return state.skills.items;
  });
  const dispatch = useDispatch();
  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [applicants, setApplicants] = useState<Applicant[]>([] as Applicant[]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const isMount = useIsMount();

  const initialData = async () => {
    const data = await userApplicants({ page: 1, status: 'PENDING', limit: PER_PAGE });
    setApplicants(data.items);
    setPage(data.page);
    setTotalCount(data.total_count);
  };

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
    if (!isMount) {
      const data = await userApplicants({ page: page, status: 'PENDING', limit: PER_PAGE });
      setPage(data.page);
      setTotalCount(data.total_count);
      if (isMobile && page > 1) setApplicants([...applicants, ...data.items]);
      else setApplicants(data.items);
    }
  };

  const getSkills = async () => {
    if (skillList.length) return;
    const res = await skills({ limit: 500 });
    dispatch(setSkills(res.items));
  };

  useEffect(() => {
    loadPage();
    localStorage.setItem('appliedJobPage', page.toString());
  }, [page]);

  useEffect(() => {
    localStorage.setItem('source', 'applied');
    localStorage.removeItem('navigateToSearch');
    initialData();
  }, []);

  return { page, setPage, applicants, totalCount, PER_PAGE, skillList, loading };
};
