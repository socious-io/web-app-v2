import React, { useEffect, useState } from 'react';
import { search, searchHistory } from 'src/core/api';

const tabs = [
  { label: 'Jobs', value: 'projects' },
  { label: 'Poeple', value: 'users' },
  { label: 'Organization', value: 'organizations' },
];
export const useSearchModal = ({ open, onClose }) => {
  const [list, setList] = useState([]);
  const [selectedTab, setSelectedTab] = useState('projects');
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSearchHistory();
  }, []);
  useEffect(() => {
    setList([]);
    setSelectedItem(null);
    fetchSearchResult(searchTerm);
  }, [selectedTab]);
  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [open]);
  console.log('list', list);
  const fetchSearchHistory = async () => {
    const result = await searchHistory({ page: 1, limit: 20 });
    console.log('historyyy', result);
  };
  const fetchSearchResult = async (q: string) => {
    setSelectedItem(null);
    setSearchTerm(q);
    const result = await search({ type: selectedTab, q, filter: {} }, { page: 1, limit: 20 });
    setList(searchIntoList(result.items));
  };
  const searchIntoList = (list) => {
    switch (selectedTab) {
      case 'users':
        return list.map((item) => ({
          title: `${item.first_name} ${item.last_name}`,
          username: item.shortname,
          image: item.image,
          isAvailable: item.open_to_work,
          id: item.id,
          type: selectedTab,
          bio: 'item.bio',
        }));
      case 'organizations':
        return list.map((item) => ({
          title: `${item.name}`,
          username: item.username,
          image: item.avatar,
          isAvailable: item.open_to_work,
          id: item.id,
          type: selectedTab,
          bio: 'item.bio',
        }));
      case 'projects':
        return list.map((item) => ({
          title: `${item.title}`,
          username: item.identity_meta.name,
          image: item.avatar,
          isAvailable: item.open_to_work,
          id: item.id,
          type: selectedTab,
          bio: 'item.bio',
        }));
    }
  };
  return { tabs, setSelectedTab, fetchSearchResult, list, setSelectedItem, selectedItem, searchTerm, setSearchTerm };
};
