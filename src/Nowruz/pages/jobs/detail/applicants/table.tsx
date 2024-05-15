import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { Dispatch, SetStateAction } from 'react';
import variables from 'src/components/_exports.module.scss';
import { ApplicantsRes } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { EmptyState } from 'src/Nowruz/modules/general/components/EmptyState';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { Overlay } from 'src/Nowruz/modules/general/components/slideoutMenu';
import { OrgOfferModal } from 'src/Nowruz/modules/Jobs/containers/OrgOfferModal';

import { ApplicantDetails } from './applicant';
import { useApplicantAction } from './useApplicantAction';

interface TableProps {
  jobId: string;
  applicants: ApplicantsRes;
  currentTab: string;
  onRefetch: Dispatch<SetStateAction<boolean>>;
}

export const Table: React.FC<TableProps> = ({ applicants, currentTab, onRefetch, jobId }) => {
  const {
    open,
    setOpen,
    applicant,
    extractCellId,
    openAlert,
    setOpenAlert,
    handleReject,
    offer,
    setOffer,
    onSuccess,
    handleCloseSuccess,
    success,
    setOpenSelectedRejectAlert,
    openSelectedRejectAlert,
    handleRejectMultiple,
    table,
    searchTerm,
    setSearchTerm,
    page,
    handleChangePage,
    applicantsList,
    total,
    PER_PAGE,
  } = useApplicantAction(jobId, applicants, currentTab, onRefetch);

  return applicantsList.length ? (
    <div className="hidden md:block border-Gray-light-mode-200 border-solid border-b rounded-lg">
      <div className="p-4 flex items-center">
        {currentTab === 'applicants' && (
          <Button
            variant="outlined"
            color="primary"
            customStyle="py-2.5 px-4 !text-sm"
            onClick={() => setOpenSelectedRejectAlert(true)}
            disabled={!table.getSelectedRowModel().rows.length}
          >
            Reject
          </Button>
        )}
        <div className="w-[400px] mr-0 ml-auto">
          <Input
            id="search-input"
            name="search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search for candidates"
            startIcon={<Icon fontSize={20} name="search-lg" color={variables.color_grey_500} />}
            autoComplete="off"
          />
        </div>
      </div>
      <table className="w-full">
        <thead className="border-Gray-light-mode-200 border-solid border-b border-t-0 border-l-0 border-r-0">
          {table.getHeaderGroups().map(headerGroup => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
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
          {table.getRowModel().rows.map(row => {
            return (
              <tr
                key={row.id}
                className="border-Gray-light-mode-200 border-solid border-b border-t-0 border-l-0 border-r-0"
              >
                {row.getVisibleCells().map(cell => {
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
      {applicantsList.length > 0 && (
        <div className="px-6 pt-3 pb-4">
          <Pagination page={page} count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => handleChangePage(p)} />
        </div>
      )}

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
        message={`Are you sure you want to reject this application? This action cannot be undone.`}
        title="Reject application"
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="error"
        submitButtonLabel="Reject"
      />
      <AlertModal
        open={openSelectedRejectAlert}
        onClose={() => setOpenSelectedRejectAlert(false)}
        onSubmit={() => handleRejectMultiple(table.getSelectedRowModel().rows.map(r => r.original.id))}
        message={`Are you sure you want to reject selected applications? This action cannot be undone.`}
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
      {success && applicant && (
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
