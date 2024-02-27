import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { Job, JobsRes, Organization, OrganizationsRes, User, UsersRes } from 'src/core/api';
import { search as searchReq } from 'src/core/api/site/site.api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { removeValuesFromObject } from 'src/core/utils';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
import { JobListingCard } from 'src/Nowruz/modules/Jobs/components/JobListingCard';

type FilterReq = {
  causes_tags?: Array<string>;
  skills?: Array<string>;
  country?: Array<string>;
  city?: Array<string>;
  label?: { value: string; label: string; countryCode: string };
};

export const useSearch = () => {
  const data = useLoaderData() as JobsRes | UsersRes | OrganizationsRes;
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const q = searchParams.get('q');

  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [searchResult, setSearchResult] = useState({} as JobsRes | UsersRes | OrganizationsRes);
  const [page, setPage] = useState(1);
  const [sliderFilterOpen, setSliderFilterOpen] = useState(false);
  const [filter, setFilter] = useState<FilterReq>({} as FilterReq);
  const [countryName, setCountryName] = useState<string | undefined>();

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
    if (filterRaw.label && filterRaw.country) {
      const label = `${filterRaw.label.label}, ${getCountryName(filterRaw.country)}`;
      setCountryName(label);
    }
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
    navigate(`/nowruz/profile/${type}/${id}/view`);
  };

  const card = useCallback(
    (item: Job | Organization | User) => {
      if (type && ['users', 'organizations'].includes(type)) {
        return (
          <div onClick={() => handleNavigate(item as Organization | User)} className="cursor-pointer">
            <ProfileCard identity={item as User | Organization} labelShown={false} />
          </div>
        );
      }
      return <JobListingCard job={item as Job} />;
    },
    [type],
  );

  useEffect(() => {
    fetchMore(page);
  }, [page, filter]);

  useEffect(() => {
    if (data.items.length) {
      setSearchResult(data);
      setFilter({});
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
