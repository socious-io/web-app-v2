import { Header } from 'src/components/atoms/header/header';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { WithdrawMissions } from 'src/components/templates/withdraw-missions';
import { AlertModal } from 'src/components/organisms/alert-modal';
import { BankAccounts } from 'src/components/templates/bank-accounts';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { printWhen } from 'src/core/utils';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { useWalletShared } from '../wallet.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const {
    form,
    externalAccounts,
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
  } = useWalletShared();

  return (
    <TopFixedMobile>
      <Header title="Wallet" onBack={() => history.back()} />
      <div className={css.container}>
        {generatedItems?.map((item) => (
          <WithdrawMissions
            key={item.id}
            mission_name={item.project?.title}
            escrow={item.escrow}
            fee={item.assigner.meta.verified_impact ? 0.05 : 0.1}
            disableText={
              item.escrow.release_id == null && isDisablePayout(item.escrow) ? 'You can payout after e few days' : ''
            }
            disbaledWithdraw={
              !externalAccounts?.length || item.escrow.release_id != null || isDisablePayout(item.escrow)
            }
            onClickWithdraw={() => withdrawFund(item.escrow.mission_id)}
          />
        ))}
        <AlertModal
          open={openAlertModal}
          onClose={onCloseModal}
          header="Transfer Completed"
          status={respPayout.transaction_id ? 'success' : 'failed'}
          title="You successfully transferred."
          subtitle="Transaction id: "
          footer={respPayout?.transaction_id}
          buttons={[{ color: 'blue', children: 'Done', onClick: () => onCloseModal() }]}
        />
        {printWhen(
          <div className={css.load} onClick={loadMoreMissions}>
            load more...
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
          !externalAccounts?.length
        )}
        <BankAccounts
          accounts={externalAccounts}
          isDisabled={!formIsValid || externalAccounts?.length === 1}
          bankAccountLink={stripeLink}
        />
      </div>
    </TopFixedMobile>
  );
};
