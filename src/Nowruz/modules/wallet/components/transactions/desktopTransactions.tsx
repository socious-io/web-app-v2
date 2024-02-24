import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './desktopTransactions.module.scss';
import { useTransactions } from './useTransactions';
import { EmptyTransactions } from '../emptyTransactions';

export const DesktopTransactions = () => {
  const { list, headers, setPage, PER_PAGE, total, navigateToDetails } = useTransactions();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Transactions history</div>
      {list.length ? (
        <>
          <table>
            <tr>
              {headers.map((h) => (
                <th key={h} className={css.header}>
                  {h}
                </th>
              ))}
            </tr>
            {list.map((item) => (
              <tr key={item.transactionId} className={css.row} onClick={() => navigateToDetails(item.missionId)}>
                <td className={css.cell}>
                  <div className="flex gap-3 items-center">
                    <Avatar size="40px" type={item.userType} img={item.profileImage} />
                    <span className="font-medium text-sm leading-5 text-Gray-light-mode-900">{item.name}</span>
                  </div>
                </td>
                <td className={css.cell}>{item.date}</td>
                {/* <td className={css.cell}>{item.type}</td> */}
                <td className={css.cell}>{item.currency}</td>
                <td className={css.cell}>{item.amount}</td>
              </tr>
            ))}
          </table>
          <Pagination count={Math.floor(total / PER_PAGE) + (total % PER_PAGE && 1)} onChange={(e, p) => setPage(p)} />
        </>
      ) : (
        <EmptyTransactions />
      )}
    </div>
  );
};
