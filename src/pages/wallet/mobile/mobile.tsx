import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { Header } from 'src/components/atoms/header-v2/header';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { WithdrawMissions } from 'src/components/templates/withdraw-missions';
import { Link } from 'src/components/atoms/link/link';
import { AlertModal } from 'src/components/organisms/alert-modal';
import { BankAccounts } from 'src/components/templates/bank-accounts';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { printWhen } from 'src/core/utils';
import { dialog } from 'src/core/dialog/dialog';
import { useForm } from 'src/core/form';
import { endpoint } from 'src/core/endpoints';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { formModel, getMissionsList, getStripeLink } from '../wallet.service';
import { Resolver, RespPayout } from '../wallet.types';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const { missionsList, stripeProfile } = (useMatch().data as Resolver) || {};
  const { items, page, total_count } = missionsList || {};
  const { data } = stripeProfile?.external_accounts || {};
  const form = useForm(formModel);
  const formIsValid = form.isValid;
  const [generatedItems, setGeneratedItems] = useState(items);
  const [totalMissions, setTotalMissions] = useState(items?.length);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [respPayout, setRespPayout] = useState<RespPayout>({
    message: '',
    transaction_id: '',
  });
  const [stripeLink, setStripeLink] = useState('');

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

  return (
    <TopFixedMobile>
      <Header title="Wallet" />
      <div className={css.container}>
        {generatedItems?.map((item) => (
          <WithdrawMissions
            key={item.id}
            mission_name={item.project?.title}
            escrow={item.escrow}
            fee={0.1}
            disableText={
              item.escrow.release_id == null && isDisablePayout(item.escrow) ? 'You can payout after e few days' : ''
            }
            disbaledWithdraw={!data?.length || item.escrow.release_id != null || isDisablePayout(item.escrow)}
            onClickWithdraw={() => withdrawFund(item.escrow.mission_id)}
          />
        ))}
        <AlertModal
          open={openAlertModal}
          onClose={() => setOpenAlertModal(false)}
          header="Transfer Completed"
          status={respPayout.transaction_id ? 'success' : 'failed'}
          title="You successfully transferred."
          subtitle="Transaction id: "
          footer={respPayout?.transaction_id}
          buttons={[{ color: 'blue', children: 'Done', onClick: () => setOpenAlertModal(false) }]}
        />
        {printWhen(
          <div className={css.load}>
            <Link onClick={loadMoreMissions}>load more...</Link>
          </div>,
          totalMissions < total_count
        )}
        {printWhen(
          <Dropdown
            register={form}
            name="country"
            label="Country"
            placeholder="country"
            list={COUNTRIES}
            onValueChange={(selected) => onSelectCountry(selected.value as string)}
          />,
          !data?.length
        )}
        <BankAccounts accounts={data} isDisabled={!formIsValid || data?.length === 1} bankAccountLink={stripeLink} />
      </div>
    </TopFixedMobile>
  );
};
