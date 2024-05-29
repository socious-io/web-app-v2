import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity } from 'src/core/api';
import { ButtonGroupItem } from 'src/Nowruz/modules/general/components/ButtonGroups/buttonGroups.types';
import store, { RootState } from 'src/store';
import { handleCloseSlider, updateFilter, updatePage } from 'src/store/reducers/contracts.reducer';
import { getContracts, getContractsByFilter } from 'src/store/thunks/contracts.thunk';

export const useContracts = () => {
  const dispatch = useDispatch();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const contractList = useSelector<RootState, Contract[]>(state => {
    return state.contracts.offers;
  });

  const { filter, page, openSlider, totalCount } = useSelector<RootState, any>(state => state.contracts);
  const activeFilter = ['all', 'ongoing', 'archived'].findIndex(item => item === filter);
  const PER_PAGE = 5;
  const pageCount = Math.floor(totalCount / PER_PAGE) + (totalCount % PER_PAGE && 1);
  const fetchMore = async () => {
    if (!currentIdentity) return;
    if (filter === 'all')
      await store.dispatch(getContracts({ page, limit: PER_PAGE, identityType: currentIdentity.type }));
    else
      await store.dispatch(getContractsByFilter({ filter, page, limit: PER_PAGE, identityType: currentIdentity.type }));
  };

  const handleChangeFilter = (newFilter: 'all' | 'ongoing' | 'archived') => {
    updatePageNumber(1);
    dispatch(updateFilter(newFilter));
  };

  useEffect(() => {
    fetchMore();
  }, [page, filter]);

  const filterButtons: ButtonGroupItem[] = [
    { label: 'View all', handleClick: () => handleChangeFilter('all') },
    { label: 'Ongoing', handleClick: () => handleChangeFilter('ongoing') },
    { label: 'Archived', handleClick: () => handleChangeFilter('archived') },
  ];

  const updatePageNumber = (page: number) => {
    dispatch(updatePage(page));
  };

  const closeSlider = () => {
    dispatch(handleCloseSlider());
  };
  return {
    filterButtons,
    operations: {},
    pageCount,
    page,
    contractList,
    openSlider,
    updatePageNumber,
    closeSlider,
    activeFilter,
  };
};
