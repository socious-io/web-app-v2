import { flexRender } from '@tanstack/react-table';
import React, { Dispatch, SetStateAction } from 'react';
import { ApplicantsRes } from 'src/core/api';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { EmptyState } from 'src/modules/general/components/EmptyState';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import { Pagination } from 'src/modules/general/components/Pagination';
import Slider from 'src/modules/general/components/Slider';
import { OrgOfferModal } from 'src/modules/Jobs/containers/OrgOfferModal';
import variables from 'src/styles/constants/_exports.module.scss';

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
    page,
    handleChangePage,
    applicantsList,
    total,
    PER_PAGE,
    handleChangeSearchTerm,
  } = useApplicantAction(jobId, applicants, currentTab, onRefetch);
  return (
    <div className="hidden md:block border border-Gray-light-mode-200 border-solid rounded-lg">
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
            onChange={e => handleChangeSearchTerm(e.target.value)}
            placeholder="Search for candidates"
            startIcon={<Icon fontSize={20} name="search-lg" color={variables.color_grey_500} />}
            autoComplete="off"
          />
        </div>
      </div>
      {applicantsList.length ? (
        <table className="w-full">
          <thead className="border-Gray-light-mode-200 border-solid border-b border-t-0 border-l-0 border-r-0">
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        id={header.id}
                        key={header.id}
                        className="px-6 py-3 bg-Gray-light-mode-50 align-middle text-xs"
                      >
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
                    return (
                      <td className="px-6 py-3 align-middle truncate" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="hidden md:block">
          <EmptyState
            icon={<Icon name="users-01" fontSize={24} color={variables.color_grey_700} />}
            message={`No ${currentTab} yet`}
            className="border-0 border-t !rounded-none rounded-t-xl"
          />
        </div>
      )}

      {applicantsList.length > 0 && (
        <div className="px-6 pt-3 pb-4">
          <Pagination page={page} count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => handleChangePage(p)} />
        </div>
      )}

      <Slider open={open} onClose={() => setOpen(false)}>
        <ApplicantDetails
          applicant={applicant}
          openOffer={() => setOffer(true)}
          openReject={() => setOpenAlert(true)}
          closeDetails={() => setOpen(false)}
        />
      </Slider>
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
          //FIXME: create a name based on firstname and lastname
          message={`Congratulations! You have successfully sent an offer to ${applicant.user.first_name}`}
          title="Offer sent"
          customIcon={<FeaturedIcon iconName="check-circle" size="md" theme="success" type="light-circle-outlined" />}
          closeButtn={true}
          closeButtonLabel="Close"
          submitButton={false}
        />
      )}
    </div>
  );
};
