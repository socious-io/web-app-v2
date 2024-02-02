import { Cell, ColumnDef } from '@tanstack/react-table';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Applicant, rejectApplicant } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';

export const useApplicantAction = (applicants: Array<Applicant>) => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [offer, setOffer] = useState(false);
  const [applicant, setApplicant] = useState({} as Applicant);
  const [success, setSuccess] = useState<boolean>(false);
  const currentSelectedId = useRef<string>();

  const navigate = useNavigate();

  const onClickName = (id: string) => {
    const details = applicants.find((applicant) => applicant.user.id === id);
    setOpen(true);
    setApplicant(details as Applicant);
  };

  const onReject = (id: string) => {
    currentSelectedId.current = id;
    setOpenAlert(true);
  };

  const onOffer = (id: string) => {
    const details = applicants.find((applicant) => applicant.id === id);
    setOffer(true);
    setApplicant(details as Applicant);
  };

  const handleReject = async () => {
    if (currentSelectedId.current) {
      const response = await rejectApplicant(currentSelectedId?.current);
      if (response.status === 'REJECTED') navigate('..');
    }
  };

  const columns = useMemo<ColumnDef<Applicant>[]>(
    () => [
      {
        id: 'name',
        header: <p className="text-xs">Name</p>,
        accessorKey: 'user',
        cell: function render({ getValue }) {
          return (
            <div
              className="flex flex-row justify-start items-center gap-2 cursor-pointer"
              onClick={() => onClickName(getValue().id)}
            >
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
                onClick={() => onReject(getValue())}
                className="text-Gray-light-mode-600 font-semibold leading-5 text-sm cursor-pointer"
              >
                Reject
              </p>

              <p
                onClick={() => onOffer(getValue())}
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

  const onSuccess = () => {
    setSuccess(true);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    navigate('..');
  };

  return {
    open,
    setOpen,
    applicant,
    setApplicant,
    onClickName,
    columns,
    extractCellId,
    openAlert,
    setOpenAlert,
    handleReject,
    offer,
    setOffer,
    onReject,
    onOffer,
    onSuccess,
    handleCloseSuccess,
    success,
  };
};
