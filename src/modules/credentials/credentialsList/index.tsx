import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { CredentialEducationRes, CredentialExperienceRes } from 'src/core/api';
import { formatDate } from 'src/core/time';
import { getIdentityMeta, translate } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import Status from 'src/modules/general/components/Status';

import css from './credentialsList.module.scss';
import { useCredentialsList } from './useCredentialsList';
import { EducationDetails } from '../educationDetails';
import { ExperienceDetails } from '../experienceDetails';

export const CredentialList = () => {
  const {
    credentialsList,
    totalPage,
    generateStatus,
    page,
    setPage,
    onApprove,
    onReject,
    onView,
    handleCloseModal,
    openModal,
    experience,
    education,
    onUpdateExperience,
    onUpdateEducation,
    avatarInfo,
    selectedCredential,
    onSelectCredential,
    userProfile,
    verified,
  } = useCredentialsList();

  const columns = useMemo<ColumnDef<CredentialExperienceRes | CredentialEducationRes>[]>(
    () => [
      {
        id: 'name',
        header: translate('cred-col-name'),
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => {
          const id = getValue();
          const item = credentialsList.find(list => list.id === id) || null;
          if (item) {
            const { name, username } = getIdentityMeta(userProfile ? item.org : item.user);
            return (
              <div className="flex justify-start items-center gap-3">
                <Avatar
                  size="40px"
                  type={userProfile ? 'organizations' : 'users'}
                  img={userProfile ? item.org_image?.url : item.avatar?.url}
                />
                <div className="flex flex-col text-sm font-normal text-Gray-light-mode-600 leading-5">
                  <span className="font-medium text-Gray-light-mode-900">{name}</span>
                  {username}
                </div>
              </div>
            );
          } else {
            return null;
          }
        },
      },
      {
        id: 'type',
        header: translate('cred-col-type'),
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => {
          const item = credentialsList.find(list => list.id === getValue()) || {};
          return 'experience' in item ? translate('cred-col-work') : translate('cred-col-edu');
        },
      },
      {
        id: 'status',
        header: translate('cred-col-status'),
        accessorKey: 'status',
        cell: ({ getValue }: { getValue: Getter<string> }) => (
          <div className="flex items-center">
            <Status {...generateStatus[getValue()]} />
          </div>
        ),
      },
      {
        id: 'date',
        header: translate('cred-col-req-date'),
        accessorKey: 'created_at',
        cell: ({ getValue }: { getValue: Getter<string> }) => formatDate(getValue()),
      },
    ],
    [credentialsList],
  );

  const actionsCell = {
    id: 'actions',
    header: '',
    accessorKey: 'id',
    cell: ({ getValue }: { getValue: Getter<string> }) => {
      const item = credentialsList.find(list => list.id === getValue()) || null;
      if (item) {
        return (
          <div className="flex flex-1 items-center">
            <Button
              color="primary"
              variant="text"
              onClick={() => onView(item, 'experience' in item)}
              customStyle="!text-sm !font-semibold"
            >
              {translate('cred-view')}
            </Button>
            {item.status === 'PENDING' && (
              <Button
                color="secondary"
                variant="text"
                onClick={() => onReject(item.id, 'experience' in item)}
                customStyle="!text-sm !font-semibold"
              >
                {translate('cred-decline')}
              </Button>
            )}
          </div>
        );
      } else {
        return null;
      }
    },
  };

  const table = useReactTable({
    data: credentialsList,
    columns: verified && !userProfile ? [...columns, actionsCell] : columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col">
      {!userProfile && (
        <div className="flex gap-3 justify-end">
          <Button
            color="inherit"
            variant="outlined"
            disabled={!selectedCredential.id}
            onClick={() => onApprove(selectedCredential.id, selectedCredential.name === 'experience')}
          >
            {translate('cred-approve')}
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            disabled={!selectedCredential.id}
            onClick={() => onReject(selectedCredential.id, selectedCredential.name === 'experience')}
          >
            {translate('cred-decline')}
          </Button>
        </div>
      )}
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
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
                  <tr key={row.id} className={css['row']}>
                    {row.getVisibleCells().map(cell => {
                      const item = cell.column.id === 'name' ? cell.row.original : null;
                      return (
                        <td className={css['col']} key={cell.id}>
                          {cell.column.id === 'name' ? (
                            <div className="flex justify-start items-center gap-3">
                              {!userProfile && item && (
                                <Checkbox
                                  id={item.id}
                                  checked={selectedCredential.id === item.id}
                                  onChange={() => onSelectCredential(item.id, 'experience' in item)}
                                  disabled={item.status !== 'PENDING' || !verified}
                                />
                              )}
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
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
      {!!experience && (
        <ExperienceDetails
          open={openModal.name === 'experience' && openModal.open}
          handleClose={handleCloseModal}
          experience={experience}
          onUpdateExperience={onUpdateExperience}
          avatarInfo={avatarInfo}
          readonly={experience?.credential?.status !== 'PENDING'}
        />
      )}
      {!!education && (
        <EducationDetails
          open={openModal.name === 'education' && openModal.open}
          handleClose={handleCloseModal}
          education={education}
          onUpdateEducation={onUpdateEducation}
          avatarInfo={avatarInfo}
          readonly={education?.credential?.status !== 'PENDING'}
        />
      )}
    </div>
  );
};
