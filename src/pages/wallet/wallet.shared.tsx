import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { dialog } from 'src/core/dialog/dialog';
import { useForm } from 'src/core/form';
import { endpoint } from 'src/core/endpoints';
import { formModel, getMissionsList, getStripeLink } from './wallet.service';
import { Resolver, RespPayout } from './wallet.types';

export const useWalletShared = () => {
  const {
    missionsList: { items, page, total_count },
    stripeProfile,
    jpStripeProfile,
  } = useMatch().data as Resolver;

  let accounts = [];
  if (stripeProfile?.external_accounts.data.length > 0) accounts.push(...stripeProfile?.external_accounts.data);
  if (jpStripeProfile?.external_accounts.data.length > 0) accounts.push(...jpStripeProfile?.external_accounts.data);

  const { data } = { data: accounts } || {};
  const form = useForm(formModel);
  const formIsValid = form.isValid;
  const [generatedItems, setGeneratedItems] = useState(items);
  const [totalMissions, setTotalMissions] = useState(items.length);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [respPayout, setRespPayout] = useState<RespPayout>({
    message: '',
    transaction_id: '',
  });
  const [stripeLink, setStripeLink] = useState('');

  function onCloseModal() {
    setOpenAlertModal(false);
  }

  async function withdrawFund(id: string) {
    endpoint.post.payments['{mission_id}/payout'](id).then(async (data) => {
      setOpenAlertModal(true);
      setRespPayout(data as RespPayout);
      const result = await getMissionsList({ page: page });
      setGeneratedItems((prev) => prev.concat(result.items));
    });
  }

  async function loadMoreMissions() {
    const result = await getMissionsList({ page: page + 1 });
    setGeneratedItems((prev) => prev.concat(result.items));
    setTotalMissions((prev: number) => prev + result.items.length);
  }

  async function onSelectCountry(value: string) {
    try {
      const result = await getStripeLink(value);
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

  function isDisablePayout(escrow: { created_at: string; release_id: string }) {
    const currentDate = Number(new Date());
    const createdDate = Number(new Date(escrow?.created_at));
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 10;
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
