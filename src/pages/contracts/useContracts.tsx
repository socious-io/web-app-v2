import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { translate } from 'src/core/utils';
import { ButtonGroupItem } from 'src/modules/general/components/ButtonGroups/buttonGroups.types';
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
  const activeFilter = ['all', 'ongoing', 'archived'].findIndex(item => item === filter);
  const PER_PAGE = 10;
  const pageCount = Math.ceil(total / PER_PAGE);

  const fetchMore = async () => {
    if (!currentIdentity) return;
    dispatch(handleDisplaySlider(false));

    if (filter === 'all') await store.dispatch(getContracts({ page, limit: PER_PAGE }));
    else return;
    // await store.dispatch(getContractsByFilter({ filter, page, limit: PER_PAGE, identityType: currentIdentity.type }));
  };

  const handleChangeFilter = (newFilter: 'all' | 'ongoing' | 'archived') => {
    updatePageNumber(1);
    dispatch(updateFilter(newFilter));
  };

  useEffect(() => {
    fetchMore();
  }, [page, filter]);

  const filterButtons: ButtonGroupItem[] = [
    { label: translate('cont-filter-all'), handleClick: () => handleChangeFilter('all') },
    { label: translate('cont-filter-ongoing'), handleClick: () => handleChangeFilter('ongoing') },
    { label: translate('cont-filter-archived'), handleClick: () => handleChangeFilter('archived') },
  ];

  const updatePageNumber = (page: number) => {
    dispatch(updatePage(page));
  };

  const closeSlider = () => {
    dispatch(handleDisplaySlider(false));
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
