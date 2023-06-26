import { DropdownBtnItem } from 'src/components/atoms/dropdown-btn/dropdown-btn.types';
import { search } from './desktop/search.services';
import { PayloadModel } from './desktop/search.types';
import { useMatch, useNavigate, useLocation } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import { Pagination } from 'src/core/types';

export const useSearchShared = () => {
  const resolver = useMatch();
  const data = resolver.ownData as Pagination<unknown>;
  const [list, setList] = useState(data.items);
  const [result, setResult] = useState<number>(data.total_count);
  const navigate = useNavigate();
  const location = useLocation();

  const updateList = (newState: PayloadModel) => {
    search(newState).then((resp) => {
      setResult(resp.total_count);
      setList(resp.items);
    });
  };

  const onMorePageClick = () => {
    navigate({
      to: `/d/search`,
      search: (p) => ({ ...p, page: p.page++ }),
    });
  };

  const menu: DropdownBtnItem[] = [
    { id: 1, label: 'Jobs', value: 'projects' },
    { id: 2, label: 'People', value: 'users' },
  ];

  function onTypeChange(menu: DropdownBtnItem) {
    setList([]);
    setResult(0);
    navigate({
      to: `/d/search`,
      search: (p) => ({ ...p, page: 1, type: menu.value }),
    });
  }

  useEffect(() => {
    const query = location.current.search as PayloadModel;
    updateList(query);
  }, [location.current.href]);

  return { updateList, onMorePageClick, menu, onTypeChange, location, list, result, data };
};
