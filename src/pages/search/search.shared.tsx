import { DropdownBtnItem } from 'src/components/atoms/dropdown-btn/dropdown-btn.types';
import { search } from './desktop/search.services';
import { PayloadModel } from './desktop/search.types';
import { useMatch, useNavigate, useLocation } from '@tanstack/react-location';
import { useEffect, useState } from 'react';
import { Pagination } from 'src/core/types';
import { like, unlike } from '../feed/mobile/mobile.service';

export const useSearchShared = () => {
  const resolver = useMatch();
  const data = resolver.ownData as Pagination<unknown>;
  const [list, setList] = useState(data.items);
  const [result, setResult] = useState<number>(data.total_count);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.current.href.includes('search')) {
      const query = location.current.search as PayloadModel;
      updateList(query);
    }
  }, [location.current.href]);

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

  function findLabelByValue(value: string | unknown, defaultName: string): string {
    const label = menu.find((item) => item.value === value)?.label;
    return label ? label : defaultName;
  }

  const menu: DropdownBtnItem[] = [
    { id: 1, label: 'Jobs', value: 'projects' },
    { id: 2, label: 'People', value: 'users' },
    // { id: 3, label: 'Posts', value: 'posts' },
  ];

  function onTypeChange(menu: DropdownBtnItem) {
    setList([]);
    setResult(0);
    navigate({
      to: `/d/search`,
      search: (p) => ({ ...p, page: 1, type: menu.value }),
    });
  }

  function onSkillsChange(skills: string[]) {
    navigate({
      to: `/d/search`,
      search: (p) => ({ ...p, page: 1, filter: { ...p.filter, skills } }),
    });
  }

  function onSocialCausesChange(causes_tags: string[]) {
    navigate({
      to: `/d/search`,
      search: (p) => ({ ...p, page: 1, filter: { ...p.filter, causes_tags } }),
    });
  }

  const onPostLike = (id: string) => {
    const clone = [...list];
    const ref = clone.find((item) => item.id === id) as Feed;
    ref.liked = true;
    ref.likes = ref.likes + 1;
    setList(clone);
    like(id).then(() => {});
  };

  const onPostRemoveLike = (id: string) => {
    const clone = [...list];
    const ref = clone.find((item) => item.id === id) as Feed;
    ref.liked = false;
    ref.likes = ref.likes - 1;
    setList(clone);
    unlike(id).then(() => {});
  };

  return {
    updateList,
    onMorePageClick,
    menu,
    onTypeChange,
    location,
    list,
    result,
    data,
    findLabelByValue,
    onPostLike,
    onPostRemoveLike,
    onSocialCausesChange,
    onSkillsChange,
  };
};
