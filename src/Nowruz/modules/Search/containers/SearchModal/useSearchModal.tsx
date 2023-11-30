import React, { useEffect, useState } from 'react';
import { search, searchHistory } from 'src/core/api';

const tabs = [
  { label: 'Jobs', value: 'projects' },
  { label: 'Poeple', value: 'users' },
  { label: 'Organization', value: 'organizations' },
];
export const useSearchModal = () => {
  const [selectedTab, setSelectedTab] = useState('users');
  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = async () => {
    const result = await searchHistory({ page: 1, limit: 20 });
    console.log(result);
  };
  const fetchSearchResult = async (q: string) => {
    const result = await search({ type: selectedTab, q, filter: {} }, { page: 1, limit: 20 });
    console.log(result);
  };

  return { tabs, setSelectedTab, fetchSearchResult };
};
