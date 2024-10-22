import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { Job, JobsRes, Organization, OrganizationsRes, User, UsersRes } from 'src/core/api';
import { search as searchReq } from 'src/core/api/site/site.api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { removeValuesFromObject } from 'src/core/utils';
import { JobListingCard } from 'src/modules/Jobs/components/JobListingCard';
import { SearchResultProfile } from 'src/modules/Search/components/searchResultProfile';

export type FilterReq = {
  causes_tags?: Array<string>;
  social_causes?: Array<string>;
  skills?: Array<string>;
  country?: Array<keyof typeof COUNTRIES_DICT>;
  city?: Array<string>;
  remote_preference?: string;
  job_category_id: string;
  project_length?: Array<string>;
  experience_level: Array<number>;
  payment_type?: string | number;
  location?: { value: number; label: string; countryCode: string };
  events?: Array<string>;
};

export const useSearch = () => {
  const { searchData: data } = useLoaderData() as { searchData: JobsRes | UsersRes | OrganizationsRes };
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const q = searchParams.get('q');
  const pageNumber = Number(searchParams.get('page') || 1);
  const scrollIndx = Number(searchParams.get('scrollIndex') || -1);

  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [searchResult, setSearchResult] = useState({} as JobsRes | UsersRes | OrganizationsRes);
  const [page, setPage] = useState(pageNumber);
  const [scrollIndex, setscrollIndex] = useState(scrollIndx);
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const executeScroll = () => scrollRef.current && scrollRef.current.scrollIntoView();

  const [sliderFilterOpen, setSliderFilterOpen] = useState(false);
  const filter = JSON.parse(localStorage.getItem('filter') || '{}') as FilterReq;
  const [countryName, setCountryName] = useState<string | undefined>('');
  const prevPage = useRef(0);

  const navigate = useNavigate();

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  const filterNeeded = (filter: FilterReq) => {
    const propertyName = type === 'projects' ? 'causes_tags' : 'social_causes';
    return {
      [propertyName]: filter.causes_tags,
      skills: filter.skills,
      country: filter.country,
      city: filter.city,
      remote_preference: filter.remote_preference,
      job_category_id: filter.job_category_id,
      project_length: filter.project_length,
      experience_level: filter.experience_level,
      payment_type: filter.payment_type,
      events: filter.events,
    };
  };

  const fetchMore = async () => {
    try {
      const body = {
        filter: filter ? removeValuesFromObject(filterNeeded(filter), ['', null, undefined]) : {},
        type,
      } as any;
      if (q?.trim()) {
        Object.assign(body, { q });
      }
      if (prevPage.current === page - 1 && searchResult.items?.length === (page - 1) * PER_PAGE) {
        // if see more is clicked
        const data = await searchReq(body, { limit: 10, page });
        setSearchResult({
          ...data,
          items: [...searchResult.items, ...data.items],
        });
      } else {
        // if page is changed through URL
        const data = await searchReq(body, { limit: PER_PAGE * page, page: 1 });
        setSearchResult(data);
      }
    } catch (e) {
      console.log('error in fetching search result', e);
    }
  };

  const handleCloseOrApplyFilter = () => {
    setSliderFilterOpen(!sliderFilterOpen);
  };

  const onClose = () => {
    handleCloseOrApplyFilter();
  };

  const onApply = async (filterRaw: FilterReq) => {
    localStorage.setItem('filter', JSON.stringify(filterRaw));
    if (filterRaw.location && !!filterRaw?.country?.length) {
      const label = `${filterRaw.location.label}, ${getCountryName(filterRaw.country[0])}`;
      setCountryName(label);
    }
    if (page !== 1) setPage(1);
    else navigate(`/search?q=${q}&type=${type}&page=1`);
    handleCloseOrApplyFilter();
  };

  const readableType = useMemo(() => {
    if (type === 'projects') return { title: 'jobs', type: 'jobs' };
    if (type === 'users') {
      if (filter.events?.length) return { title: 'event attendees', type: 'people' };
      return { title: 'people', type: 'people' };
    }
    return { title: 'organizations', type: 'organizations' };
  }, [type, filter]);

  const isUser = (item: Organization | User): item is User => {
    return (item as User).username !== undefined;
  };

  const handleNavigate = (e: MouseEvent<HTMLDivElement>, item: Organization | User) => {
    let id = '';
    if (isUser(item)) {
      id = item.username;
    } else {
      id = item.shortname;
    }
    const url = `/profile/${type}/${id}/view`;
    if (e.metaKey || e.ctrlKey) window.open(url);
    else navigate(url);
  };

  const card = useCallback(
    (item: Job | Organization | User, index: number) => {
      if (type && ['users', 'organizations'].includes(type)) {
        return (
          <div onClick={e => handleNavigate(e, item as Organization | User)} className="cursor-pointer">
            <SearchResultProfile identity={item as User | Organization} />
          </div>
        );
      }
      return <JobListingCard job={item as Job} page={page} scrollIndex={index} />;
    },
    [type, page],
  );

  useEffect(() => {
    if (isMobile) fetchMore();
    else {
      navigate(`/search?q=${q}&type=${type}&page=${page}`);
    }
  }, [page]);

  useEffect(() => {
    setSearchResult(data);
    setPage(data.page);
    setCountryName('');
  }, [data]);

  useEffect(() => {
    executeScroll();
  }, [searchResult]);

  const handleChangeMobilePage = () => {
    prevPage.current = page;
    setPage(page + 1);
    setscrollIndex(page * PER_PAGE - 1);
  };

  return {
    data: {
      page,
      searchResult,
      total: searchResult.total_count ?? data.total_count,
      PER_PAGE,
      readableType,
      q,
      sliderFilterOpen,
      filter,
      countryName,
      scrollRef,
      scrollIndex,
    },
    operations: {
      setPage,
      card,
      handleCloseOrApplyFilter,
      onApply,
      onClose,
      getCountryName,
      handleChangeMobilePage,
    },
  };
};
