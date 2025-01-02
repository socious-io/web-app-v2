import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Job, Organization, search, User } from 'src/core/api';
import { translate } from 'src/core/utils'; // Added for translations
import { RootState } from 'src/store';

import { SearchItem, TabValue } from './SearchModal.types';

export const useSearchModal = (props: { open: boolean; onClose: () => void; setSearchText: (s: string) => void }) => {
  const [list, setList] = useState<SearchItem[]>([]);
  const identityType = useSelector<RootState, 'users' | 'organizations'>(state => {
    return state.profile.type;
  });

  const tabs = [
    ...(identityType === 'users'
      ? [{ label: translate('search-modal.tabs.jobs'), value: 'projects' as TabValue }]
      : []),
    { label: translate('search-modal.tabs.people'), value: 'users' as TabValue },
    { label: translate('search-modal.tabs.organizations'), value: 'organizations' as TabValue },
  ];

  const [selectedTab, setSelectedTab] = useState<TabValue>('projects');
  const [selectedItem, setSelectedItem] = useState<null | SearchItem>();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoResult, setShowNoResult] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setList([]);
    setSelectedItem(null);
    fetchSearchResult(searchTerm);
  }, [selectedTab]);

  const fetchSearchResult = async (q: string) => {
    setShowNoResult(false);
    setSelectedItem(null);
    setSearchTerm(q);
    props.setSearchText(q);
    if (q.length) {
      const result = await search({ type: selectedTab, q, filter: {} }, { page: 1, limit: 20 });
      setList(searchIntoList(result.items));
      if (q && result.items.length === 0) setShowNoResult(true);
    }
  };

  const navigateFullSearch = () => {
    localStorage.removeItem('navigateToSearch');
    localStorage.removeItem('filter');
    localStorage.removeItem('searchTerm');
    localStorage.removeItem('type');
    props.onClose();
    navigate(`/search?q=${searchTerm}&type=${selectedTab}&page=1`);
  };

  const searchIntoList = (list: Array<User | Organization | Job>) => {
    if (!list.length) return [];
    switch (selectedTab) {
      case 'users':
        return list.map(item => {
          const userItem = item as User;
          return {
            title: `${userItem.first_name} ${userItem.last_name}`,
            username: userItem.username,
            image: userItem.avatar?.url || '',
            isAvailable: userItem.open_to_work,
            id: userItem.id,
            type: selectedTab,
            bio: userItem.bio || '',
            isVerified: false,
          };
        });
      case 'organizations':
        return list.map(item => {
          const orgItem = item as Organization;
          return {
            title: `${orgItem.name}`,
            username: orgItem?.shortname,
            image: orgItem.image?.url || '',
            isAvailable: orgItem.hiring,
            id: orgItem.id,
            type: selectedTab,
            bio: orgItem.bio || '',
            isVerified: orgItem.verified_impact,
          };
        });
      case 'projects':
        return list.map(item => {
          const projectItem = item as Job;
          return {
            title: `${projectItem.title}`,
            username: projectItem.identity_meta.name,
            image: projectItem.identity_meta.image || '',
            id: projectItem.id,
            type: selectedTab,
            bio: '',
            isVerified: false,
          };
        });
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
    navigateFullSearch,
  };
};
