import React, { useEffect, useState } from 'react';
import { search, searchHistory } from 'src/core/api';

import { Item } from './SearchModal.types';

const tabs = [
  // { label: 'Jobs', value: 'projects' },
  { label: 'Poeple', value: 'users' },
  { label: 'Organization', value: 'organizations' },
];

export const useSearchModal = (props: { open: boolean; onClose: () => void }) => {
  const [list, setList] = useState([]);
  const [selectedTab, setSelectedTab] = useState('users');
  const [selectedItem, setSelectedItem] = useState<null | Item>();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    setList([]);
    setSelectedItem(null);
    fetchSearchResult(searchTerm);
  }, [selectedTab]);

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
  const searchIntoList = (list: Array<any>) => {
    switch (selectedTab) {
      case 'users':
        return list.map((item) => ({
          title: `${item.first_name} ${item.last_name}`,
          username: item.username,
          image: item.image,
          isAvailable: item.open_to_work,
          id: item.id,
          type: selectedTab,
          bio: item.bio,
          isVerified: false,
        }));
      case 'organizations':
        return list.map((item) => ({
          title: `${item.name}`,
          username: item.shortname,
          image: item.avatar,
          isAvailable: item.open_to_work,
          id: item.id,
          type: selectedTab,
          bio: item.bio,
          isVerified: item.verified_impact,
        }));
      // case 'projects':
      //   return list.map((item) => ({
      //     title: `${item.title}`,
      //     username: item.identity_meta.name,
      //     image: item.avatar,
      //     isAvailable: item.open_to_work,
      //     id: item.id,
      //     type: selectedTab,
      //     bio: item.bio,
      //     isVerified: false,
      //   }));
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
