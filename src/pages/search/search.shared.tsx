import { DropdownBtnItem } from '@atoms/dropdown-btn/dropdown-btn.types';
import { search } from './desktop/search.services';
import { PayloadModel } from './desktop/search.types';
import { useMatch, useNavigate, useLocation, useRouter } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import { Pagination } from 'src/core/types';
import { removeEmptyArrays } from 'src/core/utils';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useSearchShared = () => {
  const resolver = useMatch();
  const data = resolver.ownData as Pagination<unknown>;
  const [list, setList] = useState(data.items);
  const [result, setResult] = useState<number>(data.total_count);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.listeners.push(() => {
      const query = location.current.search as unknown as PayloadModel;
      updateList(query, { reset: query.page === 1 });
    });
    return () => {
      location.listeners.pop();
    };
  }, []);

  const updateList = (newState: PayloadModel, option?: { reset: boolean }) => {
    search(newState).then((resp) => {
      setResult(resp.total_count);
      option?.reset && setList([]);
      setList((prev) => [...prev, ...resp.items]);
    });
  };

  const onMorePageClick = () => {
    navigate({
      to: isTouchDevice() ? '/m/search' : `/d/search`,
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
  ];

  function onTypeChange(menu: DropdownBtnItem) {
    setList([]);
    setResult(0);

    navigate({
      search: (p) => {
        const userParam = {
          page: 1,
          type: 'users',
          filter: removeEmptyArrays({
            skills: p?.filter?.skills || [],
            social_causes: p?.filter?.causes_tags || [],
          }),
        };
        const jobsParam = {
          page: 1,
          type: 'projects',
          filter: removeEmptyArrays({
            skills: p?.filter?.skills || [],
            causes_tags: p?.filter?.social_causes || [],
          }),
        };
        return menu.value === 'users' ? userParam : jobsParam;
      },
      replace: true,
    });
  }

  function onSkillsChange(skills: string[]) {
    navigate({
      search: (p) => ({ ...p, page: 1, filter: removeEmptyArrays({ ...p.filter, skills }) }),
      replace: true,
    });
  }

  function onSocialCausesChange(social_causes: string[]) {
    navigate({
      search: (p) => {
        const projectCauses = { causes_tags: social_causes };
        const usersCauses = { social_causes: social_causes };

        function causesFilter() {
          if (p.type === 'projects') {
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
  };
};
