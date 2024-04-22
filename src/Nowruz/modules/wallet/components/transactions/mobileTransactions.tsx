import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { PaginationMobile } from 'src/Nowruz/modules/general/components/paginationMobile';

import css from './mobileTransaction.module.scss';
import { useTransactions } from './useTransactions';
import { EmptyTransactions } from '../emptyTransactions';

export const MobileTransactions = () => {
  const { list, setPage, page, PER_PAGE, total, navigateToDetails } = useTransactions();
  const renderTableRow = (
    missionId: string,
    name: string,
    date: string,
    amount: string,
    avatarType: 'users' | 'organizations',
    avatar?: string,
  ) => {
    return (
      <div className={css.row} onClick={() => navigateToDetails(missionId)}>
        <div className="flex gap-3">
          <Avatar size="40px" type={avatarType} img={avatar} />
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">{name}</span>
            <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">{date}</span>
          </div>
        </div>
        <span className="text-sm font-medium leading-5 text-Gray-light-mode-900">{amount}</span>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-6 pb-12">
      {list.length ? (
        <>
          <div className="flex flex-col">
            <div className={css.header}>
              <span>Transaction</span>
              <span>Amount</span>
            </div>
            {list.map((item) =>
              renderTableRow(item.missionId, item.name, item.date, item.mobileAmount, item.userType, item.profileImage),
            )}
          </div>
          <PaginationMobile
            page={page}
            count={Math.floor(total / PER_PAGE) + (total % PER_PAGE && 1)}
            handleChange={setPage}
          />
        </>
      ) : (
        <EmptyTransactions />
      )}
    </div>
  );
};
