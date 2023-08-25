import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { TwoColumnCursor } from '@templates/two-column-cursor/two-column-cursor';
import { WithdrawMissions } from '@templates/withdraw-missions';
import { AlertModal } from '@organisms/alert-modal';
import { BankAccounts } from '@templates/bank-accounts';
import { Dropdown } from '@atoms/dropdown-v2/dropdown';
import Card from '@atoms/card';
import { ProfileCard } from '@templates/profile-card';
import { CardMenu } from '@molecules/card-menu/card-menu';
import { printWhen } from 'src/core/utils';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { IdentityReq } from 'src/core/types';
import { useWalletShared } from '../wallet.shared';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';

export const Desktop: React.FC = () => {
  const navigate = useNavigate();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
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
  const { isLoggedIn } = useAuth();

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Following', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  return (
    <TwoColumnCursor visibleSidebar={isLoggedIn}>
      <div className={css.leftContainer}>
        <ProfileCard />
        <CardMenu title="Network" list={identity.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
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
