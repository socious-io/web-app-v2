import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import store, { RootState } from 'src/store';
import { ContractsState, handleDisplaySlider, updateFilter, updatePage } from 'src/store/reducers/contracts.reducer';
import { getContracts } from 'src/store/thunks/contracts.thunk';

export const useContracts = () => {
  const dispatch = useDispatch();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const {
    filter,
    page,
    openSlider,
    total,
    list: contractList,
  } = useSelector<RootState, ContractsState>(state => state.contracts);
  const PER_PAGE = 10;
  const pageCount = Math.ceil(total / PER_PAGE);
  const activeFilter = ['all', 'ongoing', 'archived'].findIndex(item => item === filter);

  const fetchMore = async () => {
    if (!currentIdentity) return;
    dispatch(handleDisplaySlider(false));
    store.dispatch(getContracts({ page, limit: PER_PAGE, filters: { status: filter } }));
  };

  const handleChangeFilter = (newFilter: 'all' | 'ongoing' | 'archived') => {
    updatePageNumber(1);
    dispatch(updateFilter(newFilter));
  };

  useEffect(() => {
    fetchMore();
  }, [page, filter]);

  const updatePageNumber = (page: number) => {
    dispatch(updatePage(page));
  };

  const closeSlider = () => {
    dispatch(handleDisplaySlider(false));
  };

  return {
    data: {
      activeFilter,
      contractList,
      pageCount,
      page,
      openSlider,
    },
    operations: {
      handleChangeFilter,
      updatePageNumber,
      closeSlider,
    },
  };
};
