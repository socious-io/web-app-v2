import { Cell, ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Applicant,
  ApplicantsRes,
  jobApplicants,
  rejectApplicant,
  rejectMultipleApplicants,
  search,
} from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';

export const useApplicantAction = (
  jobId: string,
  applicants: ApplicantsRes,
  currentTab: string,
  onRefetch: Dispatch<SetStateAction<boolean>>,
) => {
  const PER_PAGE = 10;
  const [applicantsList, setApplicantsList] = useState<Applicant[]>(applicants.items);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSelectedRejectAlert, setOpenSelectedRejectAlert] = useState(false);
  const [offer, setOffer] = useState(false);
  const [applicant, setApplicant] = useState({} as Applicant);
  const [success, setSuccess] = useState<boolean>(false);
  const [columnVisibility, setColumnVisibility] = useState({
    select: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [pages, setPages] = useState([
    { tab: 'applicants', page: 1 },
    { tab: 'offered', page: 1 },
    { tab: 'rejected', page: 1 },
  ]);
  const [totalCounts, setTotalCounts] = useState([
    { tab: 'applicants', count: applicants.total_count },
    { tab: 'offered', count: applicants.total_count },
    { tab: 'rejected', count: applicants.total_count },
  ]);
  const currentSelectedId = useRef<string>();

  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm('');
    setColumnVisibility({ select: currentTab === 'applicants' });
    setApplicantsList(applicants.items);
  }, [currentTab]);

  const statusObj = {
    applicants: 'PENDING',
    offered: 'OFFERED,APPROVED,HIRED,CLOSED',
    rejected: 'REJECTED',
  };
  const searchApplicants = async () => {
    try {
      const currentPage = pages.find(item => item.tab === currentTab);
      const status = statusObj[currentTab];
      const res = await search(
        { type: 'applicants', q: searchTerm, filter: { project_id: jobId, status: status } },
        { page: currentPage?.page, limit: PER_PAGE },
      );
      setApplicantsList(res.items);
      setTotalCounts(totalCounts =>
        totalCounts.map(item => (item.tab === currentTab ? { ...item, count: res.total_count } : item)),
      );
    } catch (e) {
      // FIXME: Use a global error handling approach
      console.log('error in search applicants', e);
    }
  };

  useEffect(() => {
    searchApplicants();
  }, [pages]);

  const onClickName = (userId: string, applicationId: string) => {
    const details = applicantsList.find(applicant => applicant.user.id === userId);
    currentSelectedId.current = applicationId;
    setOpen(true);
    setApplicant(details as Applicant);
  };

  const onReject = (id: string) => {
    if (!id) return;
    currentSelectedId.current = id;
    setOpenAlert(true);
  };

  const onMessage = (id: string) => {
    const details = applicantsList.find(applicant => applicant.id === id);
    const participantId = details?.user.id;
    navigate(`../../chats?participantId=${participantId}`);
  };

  const onOffer = (id: string) => {
    const details = applicantsList.find(applicant => applicant.id === id);
    setOffer(true);
    setApplicant(details as Applicant);
  };

  const handleReject = async () => {
    if (!currentSelectedId.current) return;
    try {
      setOpenAlert(false);
      await rejectApplicant(currentSelectedId?.current);

      onRefetch(true);
    } catch (e) {
      console.log('error in rejecting applicant', e);
    }
  };

  const handleRejectMultiple = async (selectedIds: string[]) => {
    try {
      await rejectMultipleApplicants({ applicants: selectedIds });
      table.toggleAllRowsSelected(false);
      onRefetch(true);
    } catch (e) {
      console.log('error in multiple applications rejection', e);
    }
    setOpenSelectedRejectAlert(false);
  };

  const columns = useMemo<ColumnDef<Applicant>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            id="chk-select-all"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            id={`chk-select-${row.id}`}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        id: 'name',
        header: <p className="text-xs">Name</p>,
        accessorKey: 'id',
        cell: function render({ getValue }) {
          const detail = applicantsList.find(applicant => applicant.id === getValue());
          return (
            <div
              className="flex flex-row justify-start items-center gap-2 cursor-pointer"
              onClick={() => {
                detail && onClickName(detail.user.id, detail.id);
              }}
            >
              <Avatar size="40px" type="users" img={detail?.user.avatar || ''} />
              <div className="flex flex-col justify-start">
                <p className="text-Gray-light-mode-900 leading-6 font-medium">{detail?.user.name}</p>
                <p className="text-Gray-light-mode-600 text-sm leading-5">@{detail?.user.username}</p>
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
      // {
      //   id: 'points',
      //   header: <p className="text-xs">Impact points</p>,
      //   cell: function render() {
      //     return (
      //       <div className="flex justify-center items-center">
      //         <p className="text-Gray-light-mode-900 text-2xl font-bold">0</p>
      //       </div>
      //     );
      //   },
      // },
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
            <div className="flex flex-row justify-start items-center">
              <p className="text-Gray-light-mode-600 font-medium leading-5 text-sm">{utc}</p>
            </div>
          );
        },
      },
      // {
      //   id: 'experience',
      //   header: <p className="text-xs">Experience</p>,
      //   cell: function render() {
      //     return (
      //       <div className="flex justify-center items-center">
      //         <p className="text-Gray-light-mode-600 font-medium leading-5 text-sm"></p>
      //       </div>
      //     );
      //   },
      // },
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
                onClick={() => onMessage(getValue())}
                className="text-Gray-light-mode-600 font-semibold leading-5 text-sm cursor-pointer"
              >
                Message
              </p>

              {['applicants'].includes(currentTab) && (
                <p
                  onClick={() => onReject(getValue())}
                  className="text-Gray-light-mode-600 font-semibold leading-5 text-sm cursor-pointer"
                >
                  Reject
                </p>
              )}
              <p
                onClick={() => onOffer(getValue())}
                className="text-Gray-light-mode-700 font-semibold leading-5 text-sm cursor-pointer"
              >
                {currentTab === 'offered' ? 'Re-hire' : 'Hire'}
              </p>
            </div>
          );
        },
      },
    ],
    [applicantsList],
  );

  const extractCellId = (cell: Cell<Applicant, unknown>) => {
    let styleClass = '';

    switch (cell.id.split('_')[1]) {
      case 'name':
        styleClass = 'w-4/12';
        break;
      case 'applied':
        styleClass = 'w-1/12';
        break;
      // case 'points':
      //   styleClass = 'w-1/12';
      //   break;
      case 'location':
        styleClass = 'w-3/12';
        break;
      case 'timezone':
        styleClass = 'w-2/12';
        break;
      // case 'experience':
      //   styleClass = 'w-1/12';
      //   break;
      case 'actions':
        styleClass = 'w-2/12';
        break;
      default:
        break;
    }

    return styleClass;
  };

  const table = useReactTable({
    data: applicantsList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
  });

  const onSuccess = () => {
    setSuccess(true);
  };

  const handleCloseSuccess = () => {
    onRefetch(true);
    setSuccess(false);
  };

  const handleChangePage = (p: number) => {
    setPages(pages => pages.map(item => (item.tab === currentTab ? { ...item, page: p } : item)));
  };

  const handleChangeSearchTerm = (value: string) => {
    setSearchTerm(value);
    handleChangePage(1);
  };

  return {
    open,
    setOpen,
    applicant,
    setApplicant,
    onClickName,
    table,
    extractCellId,
    openAlert,
    setOpenAlert,
    handleReject,
    offer,
    setOffer,
    onReject,
    onOffer,
    onSuccess,
    onMessage,
    handleCloseSuccess,
    success,
    setOpenSelectedRejectAlert,
    openSelectedRejectAlert,
    handleRejectMultiple,
    searchTerm,
    page: pages.find(p => p.tab === currentTab)?.page || 1,
    handleChangePage,
    applicantsList,
    total: totalCounts.find(item => item.tab === currentTab)?.count || 10,
    PER_PAGE,
    handleChangeSearchTerm,
  };
};
