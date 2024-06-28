import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DISPUTE_CATEGORY } from 'src/constants/DISPUTE_CATEGORY';
import { Invitation, InvitationDispute, InvitationStatus } from 'src/core/api';
import { formatDateSlash } from 'src/core/time';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { PaginationMobile } from 'src/Nowruz/modules/general/components/paginationMobile';
import Status from 'src/Nowruz/modules/general/components/Status';

import css from './index.module.scss';
import { InvitationsListProps } from './index.types';
import { useInvitationsList } from './useInvitationsList';

const InvitationsList: React.FC<InvitationsListProps> = ({ list }) => {
  const { generateStatus, invitationsList, totalPage, page, setPage } = useInvitationsList(list);

  const columns = useMemo<ColumnDef<Invitation>[]>(
    () => [
      {
        id: 'code',
        header: 'Dispute ID',
        accessorKey: 'dispute',
        cell: ({ getValue }: { getValue: Getter<InvitationDispute> }) => getValue().code,
      },
      {
        id: 'category',
        header: 'Category',
        accessorKey: 'dispute',
        cell: ({ getValue }: { getValue: Getter<InvitationDispute> }) =>
          DISPUTE_CATEGORY.find(category => category.value === getValue().category)?.label,
      },
      {
        id: 'title',
        header: 'Dispute title',
        accessorKey: 'dispute',
        cell: ({ getValue }: { getValue: Getter<InvitationDispute> }) => getValue().title,
      },
      {
        id: 'created_at',
        header: 'Submitted date',
        accessorKey: 'created_at',
        cell: ({ getValue }: { getValue: Getter<Date> }) => formatDateSlash(getValue()),
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: ({ getValue }: { getValue: Getter<InvitationStatus> }) => <Status {...generateStatus[getValue()]} />,
      },
      {
        id: 'contract_id',
        header: 'Contract ID',
        accessorKey: 'dispute',
        cell: ({ getValue }: { getValue: Getter<InvitationDispute> }) => getValue().contract.id,
      },
      {
        id: 'contract_name',
        header: 'Contract name',
        accessorKey: 'dispute',
        cell: ({ getValue }: { getValue: Getter<InvitationDispute> }) => getValue().contract.name,
      },
    ],
    [invitationsList],
  );

  const table = useReactTable({
    data: invitationsList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return invitationsList.length ? (
    <div className={css['table']}>
      <table className="w-full rounded-lg">
        <thead className={css['header']}>
          {table.getHeaderGroups().map(headerGroup => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th id={header.id} key={header.id} className={css['header__item']}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id} onClick={() => console.log('open modal')} className="cursor-pointer">
                {row.getVisibleCells().map(cell => {
                  return (
                    <td className={css['col']} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={`${css.paginationBox} hidden md:block`}>
        <Pagination page={page} count={totalPage} onChange={(_, p) => setPage(p)} />
      </div>
      <div className={`${css.paginationBox} block md:hidden`}>
        <PaginationMobile page={page} count={totalPage} handleChange={setPage} />
      </div>
    </div>
  ) : (
    <div className="w-full h-[350px] border border-solid border-Gray-light-mode-200 shadow-Shadows/shadow-sm leading-6 rounded-xl flex flex-col items-center justify-center">
      <img src="/images/cloud.svg" width={150} height={120} alt="empty-invitations" />
      <span className="text-md font-semibold text-Gray-light-mode-900 mb-1 mt-4">No invitations found</span>
      <span className="text-sm font-normal text-Gray-light-mode-600">Here are all your current invitations.</span>
    </div>
  );
};

export default InvitationsList;
