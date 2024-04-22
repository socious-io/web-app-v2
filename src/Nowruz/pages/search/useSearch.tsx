import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { Job, JobsRes, Organization, OrganizationsRes, User, UsersRes } from 'src/core/api';
import { search as searchReq } from 'src/core/api/site/site.api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { removeValuesFromObject } from 'src/core/utils';
import { JobListingCard } from 'src/Nowruz/modules/Jobs/components/JobListingCard';
import { SearchResultProfile } from 'src/Nowruz/modules/Search/components/searchResultProfile';

export type FilterReq = {
  causes_tags?: Array<string>;
  skills?: Array<string>;
  country?: Array<keyof typeof COUNTRIES_DICT>;
  city?: Array<string>;
  remote_preference?: string;
  job_category_id: string;
  project_length?: Array<string>;
  experience_level: Array<number>;
  payment_type?: string | number;
  location?: { value: number; label: string; countryCode: string };
};

export const useSearch = () => {
  const { searchData: data } = useLoaderData() as { searchData: JobsRes | UsersRes | OrganizationsRes };
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const q = searchParams.get('q');

  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [searchResult, setSearchResult] = useState({} as JobsRes | UsersRes | OrganizationsRes);
  const [page, setPage] = useState(data.page);
  const [sliderFilterOpen, setSliderFilterOpen] = useState(false);
  const savedFilter = JSON.parse(localStorage.getItem('filter') || '{}') as FilterReq;
  const [filter, setFilter] = useState<FilterReq>(savedFilter);
  const [countryName, setCountryName] = useState<string | undefined>('');

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
    };
  };

  const fetchMore = async (page: number) => {
    const body = {
      filter: filter ? removeValuesFromObject(filterNeeded(filter), ['', null, undefined]) : {},
      type,
    } as any;
    if (q?.trim()) {
      Object.assign(body, { q });
    }
    const data = await searchReq(body, { limit: 10, page });
    if (isMobile && page > 1) setSearchResult({ ...searchResult, ...data });
    else setSearchResult(data);
  };

  const handleCloseOrApplyFilter = () => {
    setSliderFilterOpen(!sliderFilterOpen);
  };

  const onClose = () => {
    handleCloseOrApplyFilter();
  };

  const onApply = async (filterRaw: FilterReq) => {
    setFilter(filterRaw);
    if (filterRaw.location && !!filterRaw?.country?.length) {
      const label = `${filterRaw.location.label}, ${getCountryName(filterRaw.country[0])}`;
      setCountryName(label);
    }
    setPage(1);
    handleCloseOrApplyFilter();
  };

  const readableType = useMemo(() => {
    if (type === 'projects') return 'jobs';
    if (type === 'users') return 'people';
    return 'organization';
  }, [type]);

  const isUser = (item: Organization | User): item is User => {
    return (item as User).username !== undefined;
  };

  const handleNavigate = (item: Organization | User) => {
    let id = '';
    if (isUser(item)) {
      id = item.username;
    } else {
      id = item.shortname;
    }
    navigate(`/profile/${type}/${id}/view`);
  };

  const card = useCallback(
    (item: Job | Organization | User) => {
      if (type && ['users', 'organizations'].includes(type)) {
        return (
          <div
            onClick={e => {
              if (e.target === e.currentTarget) handleNavigate(item as Organization | User);
            }}
            className="cursor-pointer"
          >
            <SearchResultProfile identity={item as User | Organization} />
          </div>
        );
      }
      return <JobListingCard job={item as Job} />;
    },
    [type],
  );

  useEffect(() => {
    fetchMore(page);
    localStorage.setItem('searchPage', page.toString());
    localStorage.setItem('filter', JSON.stringify(filter));
  }, [page, filter]);

  useEffect(() => {
    if (data.items.length) {
      setSearchResult(data);
      const savedFilter = JSON.parse(localStorage.getItem('filter') || '{}') as FilterReq;
      setFilter(savedFilter);
      setCountryName('');
    }
  }, [data]);

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
    },
    operations: {
      setPage,
      card,
      handleCloseOrApplyFilter,
      onApply,
      onClose,
      getCountryName,
    },
  };
};
