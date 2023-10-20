import { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DropdownBtnItem } from 'src/components/atoms/dropdown-btn/dropdown-btn.types';
import { Pagination } from 'src/core/types';
import { removeEmptyArrays } from 'src/core/utils';

import { search } from './desktop/search.services';
import { PayloadModel } from './desktop/search.types';

type FilterRules = {
  [entity: string]: {
    socialCauses: boolean;
    skills: boolean;
    location: boolean;
  };
};
export const useSearchShared = () => {
  const data = useLoaderData() as Pagination<unknown>;
  const [list, setList] = useState(data.items);
  const [result, setResult] = useState<number>(data.total_count);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSkills, setSelectedSkills] = useState<Array<{ label: string; value: string }>>([]);
  const [selectedSocialCauses, setSelectedSocialCauses] = useState<Array<{ label: string; value: string }>>([]);
  const [openSkillsModal, setOpenSkillsModal] = useState(false);
  const [openSocialSkillsModal, setOpenSocialSkillsModal] = useState(false);
  const [selectedCities, setSelectedCities] = useState<Array<{ label: string; value: string }>>([]);
  const [selectedCountries, setSelectedCountries] = useState<Array<{ label: string; value: string }>>([]);
  const [openLocationsModal, setOpenLocationsModal] = useState(false);
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const query = getRouterFilters();
    searchParams.delete('id');
    updateList({ ...query, filter: query.filter || {} }, { reset: Number(query.page) === 1 });
  }, [location]);

  const getRouterFilters = (): PayloadModel => {
    const filter = JSON.parse(query.get('filter'));
    const q = query.get('q');
    const page = query.get('page');
    const type = query.get('type');
    return { q, page, type, filter };
  };
  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedCountries([]);
    setSelectedSkills([]);
    setSelectedSocialCauses([]);
    if (searchParams.has('filter')) {
      searchParams.set('filter', '{}');
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  };

  const updateList = (newState: PayloadModel, option?: { reset: boolean }) => {
    if (newState.filter === undefined) {
      setSelectedCities([]);
      setSelectedCountries([]);
      setSelectedSkills([]);
      setSelectedSocialCauses([]);
    }
    search(newState).then((resp) => {
      setResult(resp.total_count);
      option?.reset && setList([]);
      setList((prev) => [...prev, ...resp.items]);
    });
  };

  const onMorePageClick = () => {
    const page = query.get('page');
    searchParams.set('page', (Number(page) + 1).toString());
    setSearchParams(searchParams);
  };

  function findLabelByValue(value: string | unknown, defaultName: string): string {
    const label = menu.find((item) => item.value === value)?.label;
    return label ? label : defaultName;
  }

  const menu: DropdownBtnItem[] = [
    { id: 1, label: 'Jobs', value: 'projects' },
    { id: 2, label: 'People', value: 'users' },
    { id: 3, label: 'Organizations', value: 'organizations' },
    { id: 4, label: 'Posts', value: 'posts' },
  ];

  function onTypeChange(menu: DropdownBtnItem) {
    setList([]);
    setResult(0);
    const filters = getRouterFilters();
    searchParams.set('page', '1');
    searchParams.set('q', filters.q);
    switch (menu.value) {
      case 'users':
        searchParams.set(
          'filter',
          JSON.stringify(
            removeEmptyArrays({
              skills: filters?.skills || [],
              social_causes: filters?.causes_tags || [],
              country: filters?.country || [],
              city: filters?.city || [],
            }),
          ),
        );
        searchParams.set('type', 'users');
        break;
      case 'projects':
        searchParams.set(
          'filter',
          JSON.stringify(
            removeEmptyArrays({
              skills: filters?.skills || [],
              causes_tags: filters?.causes_tags || [],
              country: filters?.country || [],
              city: filters?.city || [],
            }),
          ),
        );
        searchParams.set('type', 'projects');
        break;
      case 'organizations':
        searchParams.set(
          'filter',
          JSON.stringify(
            removeEmptyArrays({
              skills: filters?.skills || [],
              social_causes: filters?.causes_tags || [],
              country: filters?.country || [],
              city: filters?.city || [],
            }),
          ),
        );
        searchParams.set('type', 'organizations');
        break;
      case 'posts':
        searchParams.set(
          'filter',
          JSON.stringify(
            removeEmptyArrays({
              causes_tags: filters?.social_causes || [],
            }),
          ),
        );
        searchParams.set('type', 'posts');
        break;
      default:
        break;
    }
    setSearchParams(searchParams);
  }

  function onSkillsChange(skills: Array<{ label: string; value: string }>) {
    setSelectedSkills([...new Set(skills)]);
    const filters = getRouterFilters();
    setSearchParams((p) => {
      return { ...filters, page: 1, filter: JSON.stringify({ ...filters.filter, skills: skills.map((s) => s.value) }) };
    });
  }
  function onLocationChange(country: { label: string; value: string }, city: { label: string; value: string }) {
    const filters = getRouterFilters();
    setSelectedCountries([...new Set([...selectedCountries, country])]);
    setSelectedCities([...new Set([...selectedCities, city])]);
    setSearchParams((p) => {
      return {
        ...filters,
        filter: JSON.stringify({
          ...filters.filter,
          page: 1,
          country: [...selectedCountries.map((c) => c.value), country.value],
          city: [...selectedCities.map((c) => c.value), city.value],
        }),
      };
    });
  }
  function onLocationRemove(name: string) {
    const filters = getRouterFilters();
    const updatedCities = selectedCities.filter((item) => item.label !== name);
    const updatedCountries = selectedCountries.filter((item) => item.value !== name);
    setSelectedCountries(updatedCountries);
    setSelectedCities(updatedCities);
    setSearchParams((p) => {
      return {
        ...filters,
        page: 1,
        filter: JSON.stringify({
          ...filters.filter,
          country: updatedCountries.map((c) => c.value),
          city: updatedCities.map((c) => c.value),
        }),
      };
    });
  }
  function onSocialCausesChange(social_causes: Array<{ label: string; value: string }>) {
    const filters = getRouterFilters();
    setSelectedSocialCauses([...new Set(social_causes)]);
    const causesValues = social_causes.map((c) => c.value);
    setSearchParams((p) => {
      const projectCauses = { causes_tags: causesValues };
      const usersCauses = { social_causes: causesValues };
      function causesFilter() {
        if (filters.type === 'projects' || filters.type === 'posts') {
          return projectCauses;
        } else {
          return usersCauses;
        }
      }
      return {
        ...filters,
        page: 1,
        filter: JSON.stringify({
          ...filters.filter,
          ...causesFilter(),
        }),
      };
    });
  }

  function shouldShowFilterForEntity(entityName: keyof FilterRules, filterName: keyof FilterRules[string]): boolean {
    const filterRules: FilterRules = {
      projects: {
        socialCauses: true,
        skills: true,
        location: true,
      },
      users: {
        socialCauses: true,
        skills: true,
        location: true,
      },
      posts: {
        socialCauses: true,
        skills: false,
        location: false,
      },
      organizations: {
        socialCauses: true,
        skills: false,
        location: true,
      },
    };

    if (filterRules.hasOwnProperty(entityName) && filterRules[entityName][filterName] !== undefined) {
      return filterRules[entityName][filterName];
    }

    return false;
  }

  return {
    onMorePageClick,
    menu,
    onTypeChange,
    location,
    list,
    result,
    data,
    findLabelByValue,
    onSocialCausesChange,
    onSkillsChange,
    selectedSkills,
    setOpenSkillsModal,
    openSkillsModal,
    openLocationsModal,
    setOpenLocationsModal,
    clearFilters,
    onLocationChange,
    selectedCities,
    selectedCountries,
    openSocialSkillsModal,
    setOpenSocialSkillsModal,
    selectedSocialCauses,
    setList,
    onLocationRemove,
    shouldShowFilterForEntity,
    getRouterFilters,
  };
};
