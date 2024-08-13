import { ColumnDef, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DISPUTE_CATEGORY } from 'src/constants/DISPUTE_CATEGORY';
import { Dispute, DisputeState } from 'src/core/api';
import { disputes, LeaveContribution } from 'src/core/api/disputes/disputes.api';
import { toRelativeTime } from 'src/core/relative-time';
import { Chip } from 'src/modules/general/components/Chip';
import { Dot } from 'src/modules/general/components/dot';
import store from 'src/store';
import { currentIdentities } from 'src/store/thunks/identity.thunks';
import variables from 'src/styles/constants/_exports.module.scss';
export const useContributorDashboard = () => {
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
      case 'CLOSED':
        return { label: 'Closed', theme: 'secondary' as ThemeColor };
    }
  };
  const { t } = useTranslation('decentdispute');
  const columns = useMemo<ColumnDef<Dispute>[]>(
    () => [
      {
        id: 'code',
        header: t('DecDispDisputeID'),
        accessorKey: 'code',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
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
        cell: ({ getValue }: { getValue: Getter<Date> }) => toRelativeTime(getValue()),
      },
      {
        id: 'state',
        header: t('DecDispStatus'),
        accessorKey: 'state',
        cell: ({ getValue }: { getValue: Getter<DisputeState> }) => {
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
      if (res.message === 'success') {
        store.dispatch(currentIdentities());
      }
    } catch (e) {
      console.log('error in leaving contribution', e);
    }
  };

  const handleSeeAllDisputes = () => {
    navigate('center');
  };

  return { stopNotif, setStopNotif, list, table, openModal, setOpenModal, handleLeave, handleSeeAllDisputes };
};
