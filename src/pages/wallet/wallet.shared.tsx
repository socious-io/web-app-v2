import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { userPaidMissions, payoutByMission, PayoutRes, stripeLink as getStripeLink } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { useForm } from 'src/core/form';

import { formModel } from './wallet.service';
import { Resolver } from './wallet.types';

export const useWalletShared = () => {
  const {
    missionsList: { items, page, total_count },
    stripeProfileRes,
    jpStripeProfileRes,
  } = useLoaderData() as Resolver;

  const accounts = [];
  if (stripeProfileRes?.external_accounts?.data.length > 0) accounts.push(...stripeProfileRes?.external_accounts.data);
  if (jpStripeProfileRes?.external_accounts?.data.length > 0)
    accounts.push(...jpStripeProfileRes?.external_accounts.data);

  const { data } = { data: accounts } || {};
  const form = useForm(formModel);
  const formIsValid = form.isValid;
  const [generatedItems, setGeneratedItems] = useState(items);
  const [totalMissions, setTotalMissions] = useState(items.length);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [respPayout, setRespPayout] = useState<PayoutRes>({
    message: '',
    transaction_id: '',
  });
  const [stripeLink, setStripeLink] = useState('');

  function onCloseModal() {
    setOpenAlertModal(false);
  }

  async function withdrawFund(id: string) {
    payoutByMission(id).then(async (data) => {
      setOpenAlertModal(true);
      setRespPayout(data as PayoutRes);
      const result = await userPaidMissions({
        page: page,
        'filter.p.payment_type': 'PAID',
        'filter.status': 'CONFIRMED',
      });
      setGeneratedItems((prev) => prev.concat(result.items));
    });
  }

  async function loadMoreMissions() {
    const result = await userPaidMissions({
      page: page + 1,
      'filter.p.payment_type': 'PAID',
      'filter.status': 'CONFIRMED',
    });
    setGeneratedItems((prev) => prev.concat(result.items));
    setTotalMissions((prev: number) => prev + result.items.length);
  }

  async function onSelectCountry(value: string) {
    try {
      const result = await getStripeLink({ country: value });
      const {
        link: { url },
      } = result;
      setStripeLink(url);
    } catch (err: any) {
      dialog.alert({
        message: err?.response?.data.error || err?.message,
        title: 'Failed',
      });
    }
  }

  function isDisablePayout(escrow: { created_at: Date }) {
    const currentDate = Number(new Date());
    const createdDate = Number(escrow?.created_at);
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 5;
  }

  return {
    form,
    externalAccounts: data,
    formIsValid,
    generatedItems,
    totalMissions,
    total_count,
    openAlertModal,
    onCloseModal,
    respPayout,
    stripeLink,
    withdrawFund,
    loadMoreMissions,
    onSelectCountry,
    isDisablePayout,
  };
};
