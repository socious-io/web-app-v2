import { Cell, ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import variables from 'src/components/_exports.module.scss';
import { Dispute, DisputeDirection, DisputeState } from 'src/core/api';
import { disputes, LeaveContribution } from 'src/core/api/disputes/disputes.api';
import { toRelativeTime } from 'src/core/relative-time';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { Dot } from 'src/Nowruz/modules/general/components/dot';

export const useContributorDashboard = (setJoined: (val: boolean) => void) => {
  const [stopNotif, setStopNotif] = useState(false);
  const [list, setList] = useState<Dispute[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDisputes = async () => {
      const res = await disputes({ page: 1, limit: 5, 'filter.direction': 'juror' });
      setList(res.items);
    };
    getDisputes();
  }, []);

  const getChipValues = (status: DisputeState) => {
    type ThemeColor = 'primary' | 'secondary' | 'grey_blue' | 'error' | 'warning' | 'success';
    switch (status) {
      case 'AWAITING_RESPONSE':
        return { label: 'Awaiting response', theme: 'warning' as ThemeColor, color: variables.color_warning_600 };

      case 'JUROR_SELECTION':
        return { label: 'Juror selection', theme: 'warning' as ThemeColor, color: variables.color_warning_600 };
      case 'JUROR_RESELECTION':
        return { label: 'Juror selection', theme: 'warning' as ThemeColor, color: variables.color_warning_600 };
      case 'PENDING_REVIEW':
        return { label: 'Pending review', theme: 'warning' as ThemeColor, color: variables.color_warning_600 };
      case 'DECISION_SUBMITTED':
        return { label: 'Decision submitted', theme: 'success' as ThemeColor, color: variables.color_success_600 };
      case 'WITHDRAWN':
        return { label: 'Withdrawn', theme: 'secondary' as ThemeColor };
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
        id: 'category',
        header: <p className="text-xs">Category</p>,
        accessorKey: 'category',
        cell: function render({ getValue }) {
          return <div className="flex justify-start items-center">{getValue()}</div>;
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
                startIcon={color ? <Dot size="small" color={color} shadow={false} /> : ''}
                size="sm"
              />
            </div>
          );
        },
      },
      {
        id: 'contract_id',
        header: <p className="text-xs">Contract ID</p>,
        accessorKey: 'contract',
        cell: function render({ getValue }) {
          return <div className="flex justify-start items-center">{getValue().id}</div>;
        },
      },
      {
        id: 'contract_name',
        header: <p className="text-xs">Contract name</p>,
        accessorKey: 'contract',
        cell: function render({ getValue }) {
          return <div className="flex justify-start items-center">{getValue().name}</div>;
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

  const handleLeave = async () => {
    try {
      const res = await LeaveContribution();
      if (res.message === 'success') setJoined(false);
    } catch (e) {
      console.log('error in leaving contribution', e);
    }
  };

  const handleSeeAllDisputes = () => {
    navigate('center');
  };

  return { stopNotif, setStopNotif, list, table, openModal, setOpenModal, handleLeave, handleSeeAllDisputes };
};
