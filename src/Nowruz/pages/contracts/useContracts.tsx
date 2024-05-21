import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Contract, CurrentIdentity } from 'src/core/api';
import dapp from 'src/dapp';
import { ButtonGroupItem } from 'src/Nowruz/modules/general/components/ButtonGroups/buttonGroups.types';
import store, { RootState } from 'src/store';
import { getContracts, getContractsByFilter } from 'src/store/thunks/contracts.thunk';

export const useContracts = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const contractList = useSelector<RootState, Contract[]>(state => {
    return state.contracts.offers;
  });
  const itemsCount = useSelector<RootState, number>(state => {
    return state.contracts.totalCount;
  });

  const currentPage = useSelector<RootState, number>(state => {
    return state.contracts.page;
  });
  const [page, setPage] = useState(currentPage);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'archived'>('all');
  const [openOverlayModal, setOpenOverlayModal] = useState(false);
  const PER_PAGE = 5;
  const pageCount = Math.floor(itemsCount / PER_PAGE) + (itemsCount % PER_PAGE && 1);
  const fetchMore = async () => {
    if (!currentIdentity) return;
    if (filter === 'all')
      await store.dispatch(getContracts({ page, limit: PER_PAGE, identityType: currentIdentity.type }));
    else
      await store.dispatch(getContractsByFilter({ filter, page, limit: PER_PAGE, identityType: currentIdentity.type }));
  };

  //  const { signer, chainId } = dapp.useWeb3();

  const handleChangeFilter = (newFilter: 'all' | 'ongoing' | 'archived') => {
    setPage(1);
    setFilter(newFilter);
  };

  useEffect(() => {
    fetchMore();
  }, [page, filter]);

  const filterButtons: ButtonGroupItem[] = [
    { label: 'View all', handleClick: () => handleChangeFilter('all') },
    { label: 'Ongoing', handleClick: () => handleChangeFilter('ongoing') },
    { label: 'Archived', handleClick: () => handleChangeFilter('archived') },
  ];

  return {
    filterButtons,
    operations: {},
    pageCount,
    setPage,
    page,
    contractList,
    openOverlayModal,
    setOpenOverlayModal,
  };
};
