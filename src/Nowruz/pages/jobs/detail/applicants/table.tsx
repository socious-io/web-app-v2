import { useReactTable, flexRender, getCoreRowModel, ColumnDef, Cell } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { Applicant } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';

interface TableProps {
  applicants: Array<Applicant>;
}

export const Table: React.FC<TableProps> = ({ applicants }) => {
  const columns = useMemo<ColumnDef<Applicant>[]>(
    () => [
      {
        id: 'name',
        header: <p className="text-xs">Name</p>,
        accessorKey: 'user',
        cell: function render({ getValue }) {
          return (
            <div className="flex flex-row justify-start items-center gap-2">
              <Avatar size="40px" type="users" img={getValue().avatar} />
              <div className="flex flex-col justify-start">
                <p className="text-Gray-light-mode-900 leading-6 font-medium">{getValue().name}</p>
                <p className="text-Gray-light-mode-600 text-sm leading-5">@{getValue().username}</p>
              </div>
            </div>
          );
        },
      },
      {
        id: 'applied',
        header: <p className="text-xs">Applied</p>,
        accessorKey: 'created_at',
        cell: function render({ getValue }) {
          return (
            <div className="flex justify-start items-center">
              <p className="text-Gray-light-mode-600 text-sm leading-5">{toRelativeTime(getValue())}</p>
            </div>
          );
        },
      },
      {
        id: 'points',
        header: <p className="text-xs">Impact points</p>,
        cell: function render() {
          return (
            <div className="flex justify-center items-center">
              <p className="text-Gray-light-mode-900 text-2xl font-bold">0</p>
            </div>
          );
        },
      },
      {
        id: 'location',
        header: <p className="text-xs">Location</p>,
        accessorKey: 'user',

        cell: function render({ renderValue }) {
          return (
            <div className="flex justify-start items-center">
              {renderValue().address ? (
                <p className="text-Gray-light-mode-600 font-medium leading-5 text-sm">{`${renderValue().address}, ${
                  renderValue().city
                }, ${renderValue().country}`}</p>
              ) : (
                <></>
              )}
            </div>
          );
        },
      },
      {
        id: 'timezone',
        header: <p className="text-xs">Timezone</p>,
        accessorKey: 'created_at',

        cell: function render({ getValue }) {
          const offset = new Date(getValue() as string).getTimezoneOffset();
          const offsetTimezone = (offset / 60) * -1;
          const utc = offsetTimezone > 0 ? `UTC +${offsetTimezone}` : `UTC -${offsetTimezone}`;
          return (
            <div className="flex flex-row justify-center items-center">
              <p className="text-Gray-light-mode-600 font-medium leading-5 text-sm">{utc}</p>
            </div>
          );
        },
      },
      {
        id: 'experience',
        header: <p className="text-xs">Experience</p>,
        cell: function render() {
          return (
            <div className="flex justify-center items-center">
              <p className="text-Gray-light-mode-600 font-medium leading-5 text-sm"></p>
            </div>
          );
        },
      },
      {
        id: 'actions',
        accessorKey: 'id',
        header: (
          <p className="text-xs">
            <br />
          </p>
        ),
        cell: function render({ getValue }) {
          return (
            <div className="flex justify-center items-center gap-3">
              <p
                onClick={() => console.log(getValue())}
                className="text-Gray-light-mode-600 font-semibold leading-5 text-sm cursor-pointer"
              >
                Reject
              </p>

              <p
                onClick={() => console.log(getValue())}
                className="text-Gray-light-mode-700 font-semibold leading-5 text-sm cursor-pointer"
              >
                Hire
              </p>
            </div>
          );
        },
      },
    ],
    [],
  );
  const table = useReactTable({
    data: applicants,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const extractCellId = (cell: Cell<Applicant, unknown>) => {
    let styleClass = '';

    switch (cell.id.split('_')[1]) {
      case 'name':
        styleClass = 'w-4/12';
        break;
      case 'applied':
        styleClass = 'w-1/12';
        break;
      case 'points':
        styleClass = 'w-1/12';
        break;
      case 'location':
        styleClass = 'w-3/12';
        break;
      case 'timezone':
        styleClass = 'w-1/12';
        break;
      case 'experience':
        styleClass = 'w-1/12';
        break;
      case 'actions':
        styleClass = 'w-1/12';
        break;
      default:
        break;
    }

    return styleClass;
  };

  return (
    <div className="border-Gray-light-mode-200 border-solid border-b rounded-lg">
      <div className="py-2.5 px-4 flex">
        <div
          onClick={() => {
            console.log();
          }}
          className="py-2.5 px-4 border-Gray-light-mode-200 border-solid border-b rounded-lg"
        >
          Reject
        </div>
      </div>
      <table>
        <thead className="border-Gray-light-mode-200 border-solid border-b border-t-0 border-l-0 border-r-0">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th id={header.id} key={header.id} className="px-6 py-3 bg-Gray-light-mode-50 align-middle">
                      {' '}
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className="border-Gray-light-mode-200 border-solid border-b border-t-0 border-l-0 border-r-0"
              >
                {row.getVisibleCells().map((cell) => {
                  const styleClass = extractCellId(cell);
                  return (
                    <td className={`${styleClass} px-6 py-3 align-middle`} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="py-2.5 px-4 flex justify-end gap-3">
        <div
          onClick={() => {
            console.log();
          }}
          className="py-2.5 px-4 border-Gray-light-mode-200 border-solid border-b rounded-lg"
        >
          Previous
        </div>
        <div
          onClick={() => {
            console.log();
          }}
          className="py-2.5 px-4 border-Gray-light-mode-200 border-solid border-b rounded-lg"
        >
          Next
        </div>
      </div>
    </div>
  );
};
