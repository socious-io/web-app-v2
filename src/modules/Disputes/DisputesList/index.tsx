import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DISPUTE_CATEGORY } from 'src/constants/DISPUTE_CATEGORY';
import { Dispute, DisputeState, Identity } from 'src/core/api';
import { formatDateSlash } from 'src/core/time';
import { getIdentityMeta } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import Status from 'src/modules/general/components/Status';

import css from './index.module.scss';
import { DisputesListProps } from './index.types';
import { useDisputesList } from './useDisputesList';
const DisputesList: React.FC<DisputesListProps> = ({ list, mode }) => {
  const { labelAvatarField, generateStatus, disputesList, totalPage, page, setPage, navigateToDetailDispute } =
    useDisputesList(list, mode);
  const { t } = useTranslation('decentdispute');
  const columns = useMemo<ColumnDef<Dispute>[]>(
    () => [
      {
        id: 'code',
        header: t('DecDispDisputeID'),
        accessorKey: 'code',
        cell: ({ getValue }: { getValue: Getter<string> }) => `#${getValue()}`,
      },
      {
        id: mode === 'submitted' ? 'respondent' : 'claimant',
        header: labelAvatarField,
        accessorKey: mode === 'submitted' ? 'respondent' : 'claimant',
        cell: ({ getValue }: { getValue: Getter<Identity> }) => {
          const { profileImage, name, username, type } = getIdentityMeta(getValue());
          return (
            <div className="flex justify-start items-center gap-3">
              <Avatar size="40px" type={type as 'users' | 'organizations'} img={profileImage} />
              <div className="flex flex-col text-sm font-normal text-Gray-light-mode-600 leading-5 overflow-hidden ">
                <span className="font-medium text-Gray-light-mode-900 truncate">{name}</span>
                <span className="truncate">{username}</span>
              </div>
            </div>
          );
        },
      },
      {
        id: 'category',
        header: t('DecDispCategory'),
        accessorKey: 'category',
        cell: ({ getValue }: { getValue: Getter<string> }) =>
          DISPUTE_CATEGORY.find(category => category.value === getValue())?.label,
      },
      {
        id: 'title',
        header: t('DecDispDisputeTitle'),
        accessorKey: 'title',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'created_at',
        header: t('DecDispSubmittedDate'),
        accessorKey: 'created_at',
        cell: ({ getValue }: { getValue: Getter<Date> }) => formatDateSlash(getValue()),
      },
      {
        id: 'state',
        header: t('DecDispStatus'),
        accessorKey: 'state',
        cell: ({ getValue }: { getValue: Getter<DisputeState> }) => (
          <div className="flex justify-start items-center">
            <Status {...generateStatus[getValue()]} />
          </div>
        ),
      },
      {
        id: 'contract_id',
        header: t('DecDispContractID'),
        accessorKey: 'contract',
        cell: ({ getValue }: { getValue: Getter<{ id: string; name: string }> }) => getValue().id,
      },
      {
        id: 'contract_name',
        header: t('DecDispContractName'),
        accessorKey: 'contract',
        cell: ({ getValue }: { getValue: Getter<{ id: string; name: string }> }) => getValue().name,
      },
    ],
    [disputesList],
  );

  const table = useReactTable({
    data: disputesList,
    columns: mode === 'juror' ? columns.filter(col => col.header !== labelAvatarField) : columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return disputesList.length ? (
    <div className={css['table']}>
      <div className="block overflow-auto">
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
                <tr
                  key={row.id}
                  onClick={() => navigateToDetailDispute(disputesList[row.id].id)}
                  className="cursor-pointer"
                >
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
      </div>
      <div className={`${css.paginationBox} hidden md:block`}>
        <Pagination page={page} count={totalPage} onChange={(e, p) => setPage(p)} />
      </div>
      <div className={`${css.paginationBox} block md:hidden`}>
        <PaginationMobile page={page} count={totalPage} handleChange={setPage} />
      </div>
    </div>
  ) : (
    <div className="w-full h-[350px] border border-solid border-Gray-light-mode-200 shadow-Shadows/shadow-sm leading-6 rounded-xl flex flex-col items-center justify-center">
      <img src="/images/cloud.svg" width={150} height={120} alt="empty-disputes" />
      <span className="text-md font-semibold text-Gray-light-mode-900 mb-1 mt-4">{t('DecDispNoDisputesFound')}</span>
      <span className="text-sm font-normal text-Gray-light-mode-600">{t('DecDispCurrentDisputesText')}</span>
    </div>
  );
};

export default DisputesList;
