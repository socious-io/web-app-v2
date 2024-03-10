import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Applicant, ApplicantsRes, JobsRes, Skill, skills, userApplicants } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { useIsMount } from 'src/Nowruz/modules/general/components/useIsMount';
import { RootState } from 'src/store';
import { setSkills } from 'src/store/reducers/skills.reducer';

export const useAppliedJobListing = () => {
  const loaderData = useLoaderData() as ApplicantsRes;
  const skillList = useSelector<RootState, Skill[]>((state) => {
    return state.skills.items;
  });
  const dispatch = useDispatch();
  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [applicants, setApplicants] = useState<Applicant[]>(loaderData.items);
  const [totalCount, setTotalCount] = useState(loaderData.total_count);
  const pageNumber = Number(loaderData.page);
  const [page, setPage] = useState(pageNumber);
  const [loading, setLoading] = useState(true);
  const isMount = useIsMount();

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
      console.log(data);
      setTotalCount(data.total_count);
      if (isMobile && page > 1) setApplicants([...applicants, ...data.items]);
      else setApplicants(data.items);
    }
  };

  const getSkills = async () => {
    if (skillList.length) return;
    const res = await skills({ limit: 500 });
    await dispatch(setSkills(res.items));
  };

  useEffect(() => {
    loadPage();
    //localStorage.setItem('page', page.toString());
  }, [page]);
  return { page, setPage, applicants, totalCount, PER_PAGE, skillList, loading };
};
