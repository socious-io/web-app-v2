import { useNavigate } from '@tanstack/react-location';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { WithdrawMissions } from 'src/components/templates/withdraw-missions';
import { AlertModal } from 'src/components/organisms/alert-modal';
import { BankAccounts } from 'src/components/templates/bank-accounts';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { Card } from 'src/components/atoms/card/card';
import { ProfileCard } from 'src/components/templates/profile-card';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { printWhen } from 'src/core/utils';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { useWalletShared } from '../wallet.shared';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const navigate = useNavigate();
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

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/network.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Followings', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  return (
    <TwoColumnCursor>
      <div className={css.leftContainer}>
        <ProfileCard />
        <CardMenu title="Network" list={NetworkMenuList} />
        <Card className={!externalAccounts?.length ? css.accounts : css.noCard}>
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
        </Card>
      </div>
      <div className={css.rightContainer}>
        {generatedItems?.map((item) => (
          <WithdrawMissions
            key={item.id}
            mission_name={item.project?.title}
            escrow={item.escrow}
            amount={item.amount}
            total={item.total}
            fee={item.fee}
            service={item?.payment?.service}
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
      </div>
    </TwoColumnCursor>
  );
};
