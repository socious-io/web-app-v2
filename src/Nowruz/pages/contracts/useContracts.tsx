import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Offer } from 'src/core/api';
import { ButtonGroupItem } from 'src/Nowruz/modules/general/components/ButtonGroups/buttonGroups.types';
import store, { RootState } from 'src/store';
import { getContracts } from 'src/store/thunks/contracts.thunk';

export const useContracts = () => {
  const offerList = useSelector<RootState, Offer[]>((state) => {
    return state.contracts.offers;
  });
  const itemsCount = useSelector<RootState, number>((state) => {
    return state.contracts.totalCount;
  });

  const currentPage = useSelector<RootState, number>((state) => {
    return state.contracts.page;
  });
  const [page, setPage] = useState(currentPage);
  const [openOverlayModal, setOpenOverlayModal] = useState(false);
  const PER_PAGE = 5;
  const pageCount = Math.floor(itemsCount / PER_PAGE) + (itemsCount % PER_PAGE && 1);
  const fetchMore = async (page: number) => {
    await store.dispatch(getContracts({ page, limit: PER_PAGE }));
  };

  const filterOngoing = async () => {
    // const missionRes = await userMissions('', { status: 'ACTIVE' });
    // const offerRes = offerList.filter((item) => missionRes.items.map((m) => m.offer.id).includes(item.id));
    // setOfferList(offerRes);
  };

  const filterArchived = async () => {
    // setOfferList(offerList.filter((item) => item.status === 'CLOSED'));
  };
  useEffect(() => {
    fetchMore(page);
  }, [page]);

  const filterButtons: ButtonGroupItem[] = [
    { label: 'View all', handleClick: () => fetchMore(page) },
    { label: 'Ongoing', handleClick: () => filterOngoing() },
    { label: 'Archived', handleClick: () => filterArchived() },
  ];

  return {
    filterButtons,
    operations: {},
    pageCount,
    setPage,
    page,
    offerList,
    openOverlayModal,
    setOpenOverlayModal,
  };
};
