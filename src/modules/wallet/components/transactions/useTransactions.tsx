import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CurrentIdentity, Payment, payments } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { UserType } from 'src/core/types';
import { getIdentityMeta } from 'src/core/utils';
import dapp from 'src/dapp';
import { RootState } from 'src/store';

import { PaymentDataType, Resolver } from './transactions.types';

export const useTransactions = () => {
  const { paymentRes } = useLoaderData() as Resolver;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const PER_PAGE = 10;
  const navigate = useNavigate();

  const mapDataToColumns = (payments: Payment[]) => {
    const result: PaymentDataType[] = payments.map(item => {
      const symbol = item.currency === 'JPY' ? '¥' : item.currency === 'USD' ? '$' : '';
      let currency = item.currency.toString() || '';
      if (item.service === 'CRYPTO') {
        dapp.NETWORKS.map(n => {
          const token = n.tokens.find(t => item.meta.token === t.address);
          if (token) currency = token.symbol;
        });
      }

      const paymentType = currentIdentity?.id === item.payer_identity.id ? 'Paid' : 'Received';
      const { name, profileImage, type } = getIdentityMeta(
        paymentType === 'Paid' ? item.receiver_identity : item.payer_identity,
      );

      return {
        name: item.referrers_fee ? 'Socious Referral' : name,
        profileImage: item.referrers_fee
          ? 'https://socious-new.s3.ap-northeast-1.amazonaws.com/ad4ae46f5dc138d8bc63928890bc64e0.png'
          : profileImage?.toString(),
        userType: item.referrers_fee ? 'organizations' : (type as UserType),
        amount: `${symbol}${item.amount}`,
        date: toRelativeTime(item.created_at.toString()),
        currency,
        type: paymentType === 'Paid' ? 'Payment sent' : 'Payment received',
        missionId: item.id,
        transactionId: item.transaction_id,
        mobileAmount: item.service === 'CRYPTO' ? `${currency} ${item.amount}` : `${symbol}${item.amount}`,
      };
    });
    return result;
  };

  const [list, setList] = useState<PaymentDataType[]>(mapDataToColumns(paymentRes.items));
  const [page, setPage] = useState(paymentRes.page);
  const [total, setTotal] = useState(paymentRes.total_count);
  const headers = ['Transaction', 'Date', 'Type', 'Currency', 'Amount'];

  const loadMore = async () => {
    const res = await payments({ page: page, limit: PER_PAGE });
    const newList = mapDataToColumns(res.items);
    setList(newList);
    setTotal(res.total_count);
  };

  useEffect(() => {
    loadMore();
  }, [page]);

  const navigateToDetails = (id: string) => {
    navigate(`/payments/${id}`);
  };

  return { list, headers, page, setPage, PER_PAGE, total, navigateToDetails };
};
