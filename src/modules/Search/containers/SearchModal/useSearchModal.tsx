import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Job, Organization, search, Service, ServiceSearchRes, User, UserMeta, UsersRes } from 'src/core/api';
import { translate } from 'src/core/utils';
import { RootState } from 'src/store';

import { SearchItem, TabValue } from './SearchModal.types';

export const useSearchModal = (props: { open: boolean; onClose: () => void; setSearchText: (s: string) => void }) => {
  const [list, setList] = useState<SearchItem[]>([]);
  const identityType = useSelector<RootState, 'users' | 'organizations'>(state => {
    return state.profile.type;
  });
  const location = useLocation();

  const tabs = [
    ...(identityType === 'users'
      ? [{ label: translate('search-modal.tabs.jobs'), value: 'projects' as TabValue }]
      : []),
    { label: translate('search-modal.tabs.people'), value: 'users' as TabValue },
    { label: translate('search-modal.tabs.organizations'), value: 'organizations' as TabValue },
    { label: translate('search-modal.tabs.services'), value: 'services' as TabValue },
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

  useEffect(() => {
    if (!location.pathname.includes('/search')) {
      setSearchTerm('');
    }
  }, [location.pathname]);

  const debouncedFetchSearchResult = _.debounce((q: string) => {
    fetchSearchResult(q);
  }, 500);

  const handleInputChange = (q: string) => {
    setSearchTerm(q);
    debouncedFetchSearchResult(q);
  };

  const fetchSearchResult = async (q: string) => {
    setShowNoResult(false);
    setSelectedItem(null);
    props.setSearchText(q);
    if (q.length) {
      const result = await search({ type: selectedTab, q, filter: {} }, { page: 1, limit: 20 });
      setList(searchIntoList(result.items as Array<User | Organization | Job | ServiceSearchRes>));
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

  const searchIntoList = (list: Array<User | Organization | Job | ServiceSearchRes>) => {
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
      case 'services':
        return list.map(item => {
          const service = item as ServiceSearchRes;
          return {
            title: `${service.title}`,
            username: service.identity_meta.name,
            image: service.identity_meta.avatar || '',
            id: service.id,
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
    handleInputChange,
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
