import { Cell, ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Dispute } from 'src/core/api';
import { disputes } from 'src/core/api/disputes/disputes.api';
import { toRelativeTime } from 'src/core/relative-time';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { Dot } from 'src/Nowruz/modules/general/components/dot';

export const useContributorDashboard = () => {
  const [stopNotif, setStopNotif] = useState(false);
  const [list, setList] = useState<Dispute[]>([]);

  useEffect(() => {
    const getDisputes = async () => {
      const res = await disputes({ page: 1, limit: 5 });
      setList(res.items);
    };
    getDisputes();
  }, []);

  const getChipValues = (status: 'AWAITING_RESPONSE' | 'PENDING_REVIEW' | 'RESOLVED' | 'WITHDRAWN') => {
    type ThemeColor = 'primary' | 'secondary' | 'grey_blue' | 'error' | 'warning' | 'success';
    switch (status) {
      case 'AWAITING_RESPONSE':
        return { label: 'Awaiting response', theme: 'warning' as ThemeColor, color: variables.color_warning_600 };
      case 'PENDING_REVIEW':
        return { label: 'Pending review', theme: 'warning' as ThemeColor, color: variables.color_warning_600 };
      case 'RESOLVED':
        return { label: 'Resolved', theme: 'success' as ThemeColor, color: variables.success_600 };
      case 'WITHDRAWN':
        return { label: 'Withdrawn', theme: 'secondary' as ThemeColor, color: variables.color_grey_600 };
    }
  };

  const columns = useMemo<ColumnDef<Dispute>[]>(
    () => [
      {
        id: 'code',
        header: <p className="text-xs">Dispute ID</p>,
        accessorKey: 'code',
        cell: function render({ getValue }) {
          return (
            <div className="flex justify-start items-center">
              <p className="text-Gray-light-mode-600 text-sm leading-5">{getValue()}</p>
            </div>
          );
        },
      },
      {
        id: 'code',
        header: <p className="text-xs">Category</p>,
        accessorKey: 'code',
        cell: function render({ getValue }) {
          return <div className="flex justify-start items-center"></div>;
        },
      },
      {
        id: 'title',
        header: <p className="text-xs">Dispute title</p>,
        accessorKey: 'title',
        cell: function render({ getValue }) {
          return (
            <div className="flex justify-start items-center">
              <p className="text-Gray-light-mode-600 text-sm leading-5">{getValue()}</p>
            </div>
          );
        },
      },
      {
        id: 'created_at',
        header: <p className="text-xs">Submitted date</p>,
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
        id: 'state',
        header: <p className="text-xs">Status</p>,
        accessorKey: 'state',
        cell: function render({ getValue }) {
          const { label, color, theme } = getChipValues(getValue());
          return (
            <div className="flex justify-start items-center">
              <Chip
                label={label}
                theme={theme}
                shape="round"
                transparent
                startIcon={<Dot size="small" color={color} shadow={false} />}
                size="sm"
              />
            </div>
          );
        },
      },
      {
        id: 'id',
        header: <p className="text-xs">Contract ID</p>,
        accessorKey: 'id',
        cell: function render({ getValue }) {
          return <div className="flex justify-start items-center"></div>;
        },
      },
      {
        id: 'id',
        header: <p className="text-xs">Contract name</p>,
        accessorKey: 'id',
        cell: function render({ getValue }) {
          return <div className="flex justify-start items-center"></div>;
        },
      },
    ],
    [list],
  );

  const table = useReactTable({
    data: list,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { stopNotif, setStopNotif, list, table };
};
