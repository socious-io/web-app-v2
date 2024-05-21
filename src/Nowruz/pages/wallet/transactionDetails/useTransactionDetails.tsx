import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CurrentIdentity, Payment, StripeProfileRes, payoutByMission } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { getIdentityMeta } from 'src/core/utils';
import dapp from 'src/dapp';
import { RootState } from 'src/store';

export const useTransactionDetailes = () => {
  const { paymentRes, stripeProfileRes, jpStripeProfileRes } = useLoaderData() as {
    paymentRes: Payment[];
    stripeProfileRes: StripeProfileRes;
    jpStripeProfileRes: StripeProfileRes;
  };

  const payment = paymentRes[0];
  const accounts = [];
  if (stripeProfileRes?.external_accounts?.data.length > 0) accounts.push(...stripeProfileRes.external_accounts.data);
  if (jpStripeProfileRes?.external_accounts?.data.length > 0)
    accounts.push(...jpStripeProfileRes.external_accounts.data);

  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const isUser = currentIdentity?.type === 'users';
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [disablePayout, setDisablePayout] = useState(true);

  useEffect(() => {
    checkDisablePayout();
  }, []);

  const handleBack = () => {
    navigate('/payments');
  };

  let currency = payment.currency.toString() || '';
  if (payment.service === 'CRYPTO') {
    dapp.NETWORKS.map(n => {
      const token = n.tokens.find(t => payment.meta.token === t.address);
      if (token) currency = token.symbol;
    });
  }

  const paymentType = currentIdentity?.id === payment.payer_identity.id ? 'Paid' : 'Received';
  const { name, profileImage } = getIdentityMeta(
    paymentType === 'Paid' ? payment.receiver_identity : payment.payer_identity,
  );

  const identity = paymentType === 'Paid' ? payment.receiver_identity : payment.payer_identity;

  const detail = {
    name,
    avatar: profileImage,
    email: identity.meta.email,
    avatarType: identity.type,
    date: toRelativeTime(payment.created_at.toString()),
    amount: payment.amount,
    transactionId: payment.transaction_id,
    symbol: payment.currency === 'JPY' ? '¥' : payment.currency === 'USD' ? '$' : '',
    currency,
  };

  function checkDisablePayout() {
    const currentDate = Number(new Date());
    const createdDate = Number(payment.created_at);
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDisablePayout(!payment.mission?.id || !accounts?.length || payment.verified_at != null || diffDays < 5);
  }

  const withdrawFund = async () => {
    try {
      if (!payment.mission?.id) return;
      await payoutByMission(payment.mission.id);
      setDisablePayout(true);
      setOpenWithdraw(false);
    } catch {
      console.log('error');
    }
  };

  return { handleBack, detail, disablePayout, openWithdraw, setOpenWithdraw, accounts, withdrawFund, isUser };
};
