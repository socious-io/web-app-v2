import { DropdownBtnItem } from 'src/components/atoms/dropdown-btn/dropdown-btn.types';
import { search } from './desktop/search.services';
import { PayloadModel } from './desktop/search.types';
import { useMatch, useNavigate, useLocation, useRouter } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import { Pagination } from 'src/core/types';
import { removeEmptyArrays } from 'src/core/utils';
import { isTouchDevice } from 'src/core/device-type-detector';

type FilterRules = {
  [entity: string]: {
    socialCauses: boolean;
    skills: boolean;
    location: boolean;
  };
};
export const useSearchShared = () => {
  const resolver = useMatch();
  const data = resolver.ownData as Pagination<unknown>;
  const [list, setList] = useState(data.items);
  const [result, setResult] = useState<number>(data.total_count);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSkills, setSelectedSkills] = useState<Array<{ label: string; value: string }>>([]);
  const [selectedSocialCauses, setSelectedSocialCauses] = useState<Array<{ label: string; value: string }>>([]);
  const [openSkillsModal, setOpenSkillsModal] = useState(false);
  const [openSocialSkillsModal, setOpenSocialSkillsModal] = useState(false);
  const [selectedCities, setSelectedCities] = useState<Array<{ label: string; value: string }>>([]);
  const [selectedCountries, setSelectedCountries] = useState<Array<{ label: string; value: string }>>([]);
  const [openLocationsModal, setOpenLocationsModal] = useState(false);
  useEffect(() => {
    location.listeners.push(() => {
      const query = location.current.search as unknown as PayloadModel;
      updateList(query, { reset: query.page === 1 });
    });
    return () => {
      location.listeners.pop();
    };
  }, []);

  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedCountries([]);
    setSelectedSkills([]);
    setSelectedSocialCauses([]);
    navigate({
      search: (p) => ({ ...p, page: 1, filter: {} }),
      replace: true,
    });
  };

  const updateList = (newState: PayloadModel, option?: { reset: boolean }) => {
    search(newState).then((resp) => {
      setResult(resp.total_count);
      option?.reset && setList([]);
      setList((prev) => [...prev, ...resp.items]);
    });
  };

  const onMorePageClick = () => {
    navigate({
      to: `/search`,
      search: (p) => ({ ...p, page: p.page++ }),
      replace: true,
    });
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

    navigate({
      search: (p) => {
        switch (menu.value) {
          case 'users':
            const userParam = {
              page: 1,
              type: 'users',
              q: p.q,
              filter: removeEmptyArrays({
                skills: p?.filter?.skills || [],
                social_causes: p?.filter?.causes_tags || [],
                country: p?.filter?.country || [],
                city: p?.filter?.city || [],
              }),
            };

            return userParam;
          case 'projects':
            const jobsParam = {
              page: 1,
              type: 'projects',
              q: p.q,
              filter: removeEmptyArrays({
                skills: p?.filter?.skills || [],
                causes_tags: p?.filter?.social_causes || [],
                country: p?.filter?.country || [],
                city: p?.filter?.city || [],
              }),
            };
            return jobsParam;
          case 'organizations':
            const organizationsParam = {
              page: 1,
              type: 'organizations',
              q: p.q,
              filter: removeEmptyArrays({
                skills: p?.filter?.skills || [],
                social_causes: p?.filter?.social_causes || [],
                country: p?.filter?.country || [],
                city: p?.filter?.city || [],
              }),
            };
            return organizationsParam;
          case 'posts':
            const postsParam = {
              page: 1,
              type: 'posts',
              q: p.q,
              filter: removeEmptyArrays({
                causes_tags: p?.filter?.social_causes || [],
              }),
            };
            return postsParam;

          default:
            break;
        }
      },
      replace: true,
    });
  }

  function onSkillsChange(skills: Array<{ label: string; value: string }>) {
    setSelectedSkills([...new Set(skills)]);
    navigate({
      search: (p) => ({
        ...p,
        page: 1,
        filter: removeEmptyArrays({ ...p.filter, skills: skills.map((s) => s.value) }),
      }),
      replace: true,
    });
  }
  function onLocationChange(country: { label: string; value: string }, city: { label: string; value: string }) {
    setSelectedCountries([...new Set([...selectedCountries, country])]);
    setSelectedCities([...new Set([...selectedCities, city])]);
    navigate({
      search: (p) => ({
        ...p,
        page: 1,
        filter: removeEmptyArrays({
          ...p.filter,
          country: [...selectedCountries.map((c) => c.value), country.value],
          city: [...selectedCities.map((c) => c.value), city.value],
        }),
      }),
      replace: true,
    });
  }
  function onLocationRemove(name: string) {
    const updatedCities = selectedCities.filter((item) => item.label !== name);
    const updatedCountries = selectedCountries.filter((item) => item.value !== name);
    setSelectedCountries(updatedCountries);
    setSelectedCities(updatedCities);
    navigate({
      search: (p) => ({
        ...p,
        page: 1,
        filter: removeEmptyArrays({
          ...p.filter,
          country: updatedCountries.map((c) => c.value),
          city: updatedCities.map((c) => c.value),
        }),
      }),
      replace: true,
    });
  }
  function onSocialCausesChange(social_causes: Array<{ label: string; value: string }>) {
    setSelectedSocialCauses([...new Set(social_causes)]);

    const causesValues = social_causes.map((c) => c.value);
    navigate({
      search: (p) => {
        const projectCauses = { causes_tags: causesValues };
        const usersCauses = { social_causes: causesValues };
        function causesFilter() {
          if (p.type === 'projects' || p.type === 'posts') {
            return projectCauses;
          } else {
            return usersCauses;
          }
        }

        return { ...p, page: 1, filter: removeEmptyArrays({ ...p.filter, ...causesFilter() }) };
      },
      replace: true,
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
  };
};
