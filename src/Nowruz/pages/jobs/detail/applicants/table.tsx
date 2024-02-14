import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { Dispatch, SetStateAction } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Applicant } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { EmptyState } from 'src/Nowruz/modules/general/components/EmptyState';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Overlay } from 'src/Nowruz/modules/general/components/slideoutMenu';
import { OrgOfferModal } from 'src/Nowruz/modules/Jobs/containers/OrgOfferModal';

import { ApplicantDetails } from './applicant';
import { useApplicantAction } from './useApplicantAction';

interface TableProps {
  applicants: Array<Applicant>;
  currentTab: string;
  onRefetch: Dispatch<SetStateAction<boolean>>;
}

export const Table: React.FC<TableProps> = ({ applicants, currentTab, onRefetch }) => {
  const {
    open,
    setOpen,
    applicant,
    columns,
    extractCellId,
    openAlert,
    setOpenAlert,
    handleReject,
    offer,
    setOffer,
    onSuccess,
    handleCloseSuccess,
    success,
  } = useApplicantAction(applicants, currentTab, onRefetch);

  const table = useReactTable({
    data: applicants,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return applicants.length ? (
    <div className="hidden md:block border-Gray-light-mode-200 border-solid border-b rounded-lg">
      <div className="py-2.5 px-4 flex">
        {/* <div
          onClick={() => {
            console.log();
          }}
          className="py-2.5 px-4 border-Gray-light-mode-200 border-solid border-b rounded-lg"
        >
          Reject
        </div> */}
      </div>
      <table className="w-full">
        <thead className="border-Gray-light-mode-200 border-solid border-b border-t-0 border-l-0 border-r-0">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th id={header.id} key={header.id} className="px-6 py-3 bg-Gray-light-mode-50 align-middle">
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
        {/* <div
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
        </div> */}
      </div>
      <Overlay open={open} onClose={() => setOpen(false)}>
        <ApplicantDetails
          applicant={applicant}
          openOffer={() => setOffer(true)}
          openReject={() => setOpenAlert(true)}
          closeDetails={() => setOpen(false)}
        />
      </Overlay>
      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onSubmit={handleReject}
        message="Are you sure you want to reject this application? This action cannot be undone."
        title="Reject application"
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="error"
        submitButtonLabel="Reject"
      />
      {offer && (
        <OrgOfferModal onClose={() => setOffer(false)} open={offer} applicant={applicant} onSuccess={onSuccess} />
      )}
      {success && (
        <AlertModal
          open={success}
          onClose={handleCloseSuccess}
          message={`Congratulations! You have successfully sent an offer to ${applicant.user.name}`}
          title="Offer sent"
          customIcon={<FeaturedIcon iconName="check-circle" size="md" theme="success" type="light-circle-outlined" />}
          closeButtn={true}
          closeButtonLabel="Close"
          submitButton={false}
        />
      )}
    </div>
  ) : (
    <div className="hidden md:block">
      <EmptyState
        icon={<Icon name="users-01" fontSize={24} color={variables.color_grey_700} />}
        message={`No ${currentTab} yet`}
      />
    </div>
  );
};
