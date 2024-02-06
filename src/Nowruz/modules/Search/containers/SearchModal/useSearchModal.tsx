import { useEffect, useState } from 'react';
import { search } from 'src/core/api';

import { Item } from './SearchModal.types';

const tabs = [
  { label: 'Jobs', value: 'projects' },
  { label: 'People', value: 'users' },
  { label: 'Organizations', value: 'organizations' },
];

export const useSearchModal = (props: { open: boolean; onClose: () => void; searchText?: string }) => {
  const [list, setList] = useState<Array<Item>>([]);
  const [selectedTab, setSelectedTab] = useState('projects');
  const [selectedItem, setSelectedItem] = useState<null | Item>();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    setList([]);
    setSelectedItem(null);
    fetchSearchResult(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    if (props.searchText) {
      setSearchTerm(props.searchText);
      fetchSearchResult(props.searchText);
    }
  }, [props.searchText]);

  const fetchSearchResult = async (q: string) => {
    setShowNoResult(false);
    setSelectedItem(null);
    setSearchTerm(q);
    if (q.length) {
      const result = await search({ type: selectedTab, q, filter: {} }, { page: 1, limit: 20 });
      setList(searchIntoList(result.items));
      if (q && result.items.length === 0) setShowNoResult(true);
    }
  };
  const searchIntoList = (list: Array<Item>) => {
    if (!list.length) return undefined;
    switch (selectedTab) {
      case 'users':
        return list.map((item) => ({
          title: `${item.first_name} ${item.last_name}`,
          username: item.username,
          image: item.avatar?.url,
          isAvailable: item.open_to_work,
          id: item.id,
          type: selectedTab,
          bio: item.bio,
          isVerified: false,
        }));
      case 'organizations':
        return list.map((item) => ({
          title: `${item.name}`,
          username: item?.shortname,
          image: item.image?.url,
          isAvailable: item.hiring,
          id: item.id,
          type: selectedTab,
          bio: item.bio,
          isVerified: item.verified_impact,
        }));
      case 'projects':
        return list.map((item) => ({
          title: `${item.title}`,
          username: item.identity_meta.name,
          image: item.identity_meta.image,
          isAvailable: item.open_to_work,
          id: item.id,
          type: selectedTab,
          bio: item.bio,
          isVerified: false,
        }));
    }
  };
  return {
    tabs,
    setSelectedTab,
    fetchSearchResult,
    list,
    setSelectedItem,
    selectedItem,
    searchTerm,
    setSearchTerm,
    selectedTab,
    showNoResult,
  };
};
