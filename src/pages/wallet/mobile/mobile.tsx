import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { Header } from 'src/components/atoms/header-v2/header';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { WithdrawMissions } from 'src/components/templates/withdraw-missions';
import { Link } from 'src/components/atoms/link/link';
// import { AlertModal } from 'src/components/organisms/alert-modal';
import { BankAccounts } from 'src/components/templates/bank-accounts';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { printWhen } from 'src/core/utils';
import { dialog } from 'src/core/dialog/dialog';
import { useForm } from 'src/core/form';
import { endpoint } from 'src/core/endpoints';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { formModel, getMissionsList, getStripeLink } from '../wallet.service';
import { Resolver } from '../wallet.types';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const {
    missionsList: { items, page, total_count },
    stripeProfile,
  } = useMatch().data as Resolver;
  const { data } = stripeProfile?.external_accounts || {};
  const form = useForm(formModel);
  const formIsValid = form.isValid;
  const [generatedItems, setGeneratedItems] = useState(items);
  const [totalMissions, setTotalMissions] = useState(items.length);
  //FIXME: after resolving withdraw issue
  // const [openAlertModal, setOpenAlertModal] = useState(false);
  const [stripeLink, setStripeLink] = useState('');

  function withdrawFund(id: string) {
    endpoint.post.payments['{mission_id}/payout'](id).then((data) => {
      // setOpenAlertModal(true);
      console.log(data);
    });
  }

  async function loadMoreMissions() {
    const result = await getMissionsList({ page: page + 1 });
    setGeneratedItems(result.items);
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

  return (
    <TopFixedMobile>
      <Header title="Wallet" />
      <div className={css.container}>
        {generatedItems?.map((item) =>
          printWhen(
            <WithdrawMissions
              mission_name={item.project.title}
              amount={item.escrow?.amount}
              fee={item.escrow?.amount * 0.1}
              disbaledWithdraw={!data?.length}
              onClickWithdraw={() => withdrawFund(item.escrow.mission_id)}
            />,
            item.payment?.service === 'STRIPE' && item.project.payment_type === 'PAID'
          )
        )}
        {/* <AlertModal
          open={openAlertModal}
          onClose={() => setOpenAlertModal(false)}
          header="Transfer Completed"
          status="success"
          title="You successfully transferred $490.00 USD"
          buttons={[{ color: 'blue', children: 'Done', onClick: () => setOpenAlertModal(false) }]}
        /> */}
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
