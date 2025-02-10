import { flexRender } from '@tanstack/react-table';
import React from 'react';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { Modal } from 'src/modules/general/components/modal';
import { ToggleButton } from 'src/modules/general/components/toggleButton';

import css from './contributorDashboard.module.scss';
import { EmptyList } from './emptyList';
import { useContributorDashboard } from './useContributorDashboard';

interface ContributorDashboardProps {
  newlyJoined: boolean;
}

export const ContributorDashboard: React.FC<ContributorDashboardProps> = ({ newlyJoined }) => {
  const { stopNotif, setStopNotif, list, table, openModal, setOpenModal, handleLeave, handleSeeAllDisputes } =
    useContributorDashboard();
  const footerJsx = (
    <div className="w-full px-4 md:px-6 pb-4 md:pb-6 flex flex-col gap-3 md:flex-row-reverse">
      <Button variant="contained" color="error" customStyle="w-full md:w-fit" onClick={handleLeave}>
        {translate('contributor-dashboard.leave')}
      </Button>
      <Button variant="outlined" color="primary" customStyle="w-full md:w-fit" onClick={() => setOpenModal(false)}>
        {translate('common.cancel')}
      </Button>
    </div>
  );
  return (
    <>
      <div className="flex flex-col gap-8 pt-8 pb-12">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between pb-2xl border border-solid border-t-0 border-x-0 border-b-Gray-light-mode-200 px-4 md:px-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-semibold leading-8 md:leading-[38px] text-Gray-light-mode-900">
              {translate('contributor-dashboard.title')}
            </h1>
            <h2 className="text-base font-normal leading-6 text-Gray-light-mode-600">
              {translate('contributor-dashboard.subtitle')}
            </h2>
          </div>
          <div className="w-full md:w-fit p-4 flex gap-2 border border-solid border-Gray-light-mode-200 rounded-xl">
            <ToggleButton checked={stopNotif} onChange={() => setStopNotif(!stopNotif)} size="small" />
            <span className="text-sm font-medium leading-5 text-Gray-light-mode-700">
              {translate('contributor-dashboard.stop-notifications')}
            </span>
          </div>
        </div>
        {newlyJoined && (
          <div className="px-4 md:px-8">
            <AlertMessage
              theme="success"
              iconName="check-circle"
              title={translate('contributor-dashboard.new-join-title')}
              subtitle={translate('contributor-dashboard.new-join-subtitle')}
              colOrderMobileView
            />
          </div>
        )}
        <div className="flex flex-col gap-6">
          <span className={`${css.title} px-4 md:px-8`}>{translate('contributor-dashboard.latest-disputes')}</span>
          {list.length ? (
            <div className="px-0 md:px-8">
              <div className={css['table']}>
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
                        <tr key={row.id}>
                          {row.getVisibleCells().map(cell => {
                            return (
                              <td className={css['col']} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="w-full flex justify-center mt-6">
                <Button
                  variant="text"
                  color="primary"
                  customStyle="underline hover:underline"
                  onClick={handleSeeAllDisputes}
                >
                  {translate('contributor-dashboard.see-all-disputes')}
                </Button>
              </div>
            </div>
          ) : (
            <EmptyList />
          )}
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-8">
          <span className={css.title}>{translate('contributor-dashboard.leave-section')}</span>
          <Button
            variant="text"
            color="primary"
            customStyle="!p-0 flex flex-row gap-2 w-fit"
            onClick={() => setOpenModal(true)}
          >
            <div className={`${css.bold} text-Error-700 underline`}>
              {translate('contributor-dashboard.leave-program')}
            </div>
            <Icon name="arrow-right" fontSize={20} className="text-Error-700" />
          </Button>
        </div>
      </div>
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title={translate('contributor-dashboard.modal-title')}
        subTitle={translate('contributor-dashboard.modal-subtitle')}
        footer={footerJsx}
        mobileFullHeight={false}
        mobileCentered
        headerDivider
        footerDivider={false}
        customStyle="md:max-w-[480px]"
      >
        <div className="flex flex-col gap-5 px-4 py-5 md:p-6 text-Gray-light-mode-600 font-normal text-sm leading-5">
          <p>{translate('contributor-dashboard.modal-body-1')}</p>
          <p>{translate('contributor-dashboard.modal-body-2')}</p>
          <ul className="list-disc ml-6">
            <li>{translate('contributor-dashboard.modal-bullet-1')}</li>
            <li>{translate('contributor-dashboard.modal-bullet-2')}</li>
            <li>{translate('contributor-dashboard.modal-bullet-3')}</li>
          </ul>
          <p>{translate('contributor-dashboard.modal-body-3')}</p>
          <ul className="list-disc ml-6">
            <li>{translate('contributor-dashboard.modal-bullet-4')}</li>
            <li>{translate('contributor-dashboard.modal-bullet-5')}</li>
            <li>{translate('contributor-dashboard.modal-bullet-6')}</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};
