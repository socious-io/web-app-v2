import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, Mission, MissionsRes, StripeProfileRes, payments, userPaidMissions } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { RootState } from 'src/store';

import { PaymentDataType } from './transactions.types';

export const useTransactions = () => {
  const { missionsList } = useLoaderData() as {
    missionsList: MissionsRes;
    stripeProfileRes: StripeProfileRes;
    jpStripeProfileRes: StripeProfileRes;
  };

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  console.log('test log currentIdentity', currentIdentity);
  const type = currentIdentity?.type;
  const PER_PAGE = 10;

  const mapDataToColumns = (missions: Mission[]) => {
    const result: PaymentDataType[] = missions.map((item) => {
      const symbol = item.offer.currency === 'JPY' ? '¥' : item.offer.currency === 'USD' ? '$' : '';
      return {
        id: item.id,
        name: type === 'users' ? item.organization.name : item.assignee.meta.name,
        profileImage: type === 'users' ? item.organization.image : item.assignee.meta.avatar,
        userType: type === 'users' ? 'organizations' : 'users',
        amount: type === 'users' ? `${symbol}${item.amount}` : `${symbol}${item.amount}`,
        date: toRelativeTime(item.created_at.toString()),
        currency: item.offer.currency,
        type: '', //type === 'users' ? 'Payment received' : 'Payment sent',
      };
    });
    return result;
  };

  const [list, setList] = useState<PaymentDataType[]>(mapDataToColumns(missionsList.items));
  const [page, setPage] = useState(missionsList.page);
  const [total, setTotal] = useState(missionsList.total_count);
  const headers = ['Transaction', 'Date', 'Type', 'Currency', 'Amount'];

  const loadMore = async () => {
    const res = await userPaidMissions({ page: page, 'filter.p.payment_type': 'PAID', 'filter.status': 'CONFIRMED' });
    const newList = mapDataToColumns(res.items);
    setList(newList);
    setTotal(res.total_count);
  };

  useEffect(() => {
    loadMore();
  }, [page]);

  return { list, headers, page, setPage, PER_PAGE, total };
};
