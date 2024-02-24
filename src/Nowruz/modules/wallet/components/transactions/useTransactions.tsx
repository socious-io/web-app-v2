import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CurrentIdentity, Mission, MissionsRes, StripeProfileRes, userPaidMissions } from 'src/core/api';
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
  const type = currentIdentity?.type;
  const PER_PAGE = 10;
  const navigate = useNavigate();

  const mapDataToColumns = (missions: Mission[]) => {
    const result: PaymentDataType[] = missions.map((item) => {
      const symbol = item.offer.currency === 'JPY' ? '¥' : item.offer.currency === 'USD' ? '$' : '';
      return {
        name: type === 'users' ? item.assigner.meta.name : item.assignee.meta.name,
        profileImage: type === 'users' ? item.assigner.meta.image : item.assignee.meta.avatar,
        userType: type === 'users' ? 'organizations' : 'users',
        amount: type === 'users' ? `${symbol}${item.payment.amount}` : `${symbol}${item.amount}`,
        date: toRelativeTime(item.payment.created_at.toString()),
        currency: item.offer.currency,
        type: '', //type === 'users' ? 'Payment received' : 'Payment sent',
        missionId: item.id,
        transactionId: item.escrow.id,
      };
    });
    return result;
  };

  const [list, setList] = useState<PaymentDataType[]>(mapDataToColumns(missionsList.items));
  const [page, setPage] = useState(missionsList.page);
  const [total, setTotal] = useState(missionsList.total_count);
  const headers = ['Transaction', 'Date', 'Currency', 'Amount'];

  const loadMore = async () => {
    const res = await userPaidMissions({ page: page, 'filter.p.payment_type': 'PAID', 'filter.status': 'CONFIRMED' });
    const newList = mapDataToColumns(res.items);
    setList(newList);
    setTotal(res.total_count);
  };

  useEffect(() => {
    loadMore();
  }, [page]);

  const navigateToDetails = (id: string) => {
    navigate(`/nowruz/wallet/${id}`);
  };

  return { list, headers, page, setPage, PER_PAGE, total, navigateToDetails };
};
