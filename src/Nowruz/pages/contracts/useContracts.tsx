import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { MissionsRes, OffersRes, userOffers } from 'src/core/api';
import { ButtonGroupItem } from 'src/Nowruz/modules/general/components/ButtonGroups/buttonGroups.types';

export const useContracts = () => {
  const { offers, missions } = useLoaderData() as { offers: OffersRes; missions: MissionsRes };
  console.log('test log offers', offers);
  const [page, setPage] = useState(offers.page);
  const [offerList, setOfferList] = useState(offers.items);
  const PER_PAGE = 5;
  const itemsCount = offers.total_count;
  const pageCount = Math.floor(itemsCount / PER_PAGE) + (itemsCount % PER_PAGE && 1);
  console.log('test log offers.items.length', offers.items.length);

  const fetchMore = async (page: number) => {
    const res = await userOffers({ page, limit: 5 });
    setOfferList(res.items);
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
    missions,
  };
};
