import { flexRender } from '@tanstack/react-table';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { ToggleButton } from 'src/Nowruz/modules/general/components/toggleButton';

import css from './contributorDashboard.module.scss';
import { EmptyList } from './emptyList';
import { useContributorDashboard } from './useContributorDashboard';

interface ContributorDashboardProps {
  newlyJoined: boolean;
}

export const ContributorDashboard: React.FC<ContributorDashboardProps> = ({ newlyJoined }) => {
  const { stopNotif, setStopNotif, list, table } = useContributorDashboard();
  return (
    <div className="flex flex-col gap-8 pt-8 pb-12">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between pb-2xl border border-solid border-t-0 border-x-0 border-b-Gray-light-mode-200 px-4 md:px-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-semibold leading-8 md:leading-[38px] text-Gray-light-mode-900">
            Your Contributor Dashboard
          </h1>
          <h2 className="text-base font-normal leading-6 text-Gray-light-mode-600">
            From here, you can manage your tasks and grow as a valued member of our community.
          </h2>
        </div>
        <div className="w-full md:w-fit p-4 flex gap-2 border border-solid border-Gray-light-mode-200 rounded-xl">
          <ToggleButton checked={stopNotif} onChange={() => setStopNotif(!stopNotif)} size="small" />
          <span className="text-sm font-medium leading-5 text-Gray-light-mode-700">
            Stop receiving new task notifications
          </span>
        </div>
      </div>
      {newlyJoined && (
        <div className="px-4 md:px-8">
          <AlertMessage
            theme="success"
            iconName="check-circle"
            title="Thank you for joining the Socious Contributor program!"
            subtitle="Your dedication and expertise are invaluable in maintaining the integrity and growth of our platform. Let's work together to make a lasting impact on the Socious community."
            colOrderMobileView
          />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <span className={`${css.title} px-4 md:px-8`}>Latest disputes</span>
        {list.length ? (
          <div className="w-fit border border-solid border-Gray-light-mode-200 md:rounded-xl shadow-Shadows/shadow-sm ">
            <table className="w-full">
              <thead className="bg-Gray-light-mode-50 h-11">
                {table.getHeaderGroups().map(headerGroup => {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => {
                        return (
                          <th
                            id={header.id}
                            key={header.id}
                            className={`px-6 py-3 align-middle text-xs font-medium text-Gray-light-mode-600 ${
                              index === 0 && 'rounded-tl-xl'
                            } ${index === headerGroup.headers.length - 1 && 'rounded-tr-xl'}`}
                          >
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
                    <tr
                      key={row.id}
                      // className="border-Gray-light-mode-200 border-solid border-b border-t-0 border-l-0 border-r-0"
                    >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <td
                            className={`px-6 py-3 align-middle text-sm font-normal leading-5 text-Gray-light-mode-600`}
                            key={cell.id}
                          >
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
        ) : (
          <EmptyList />
        )}
      </div>
      <div className="flex flex-col gap-4 px-4 md:px-8 ">
        <span className={css.title}>Contributor resources</span>
        <Button variant="text" color="primary" customStyle="!p-0 flex flex-row gap-2 w-fit">
          <div className={`${css.bold} text-Brand-700 underline text-start`}>
            Learn more about the Socious Contributor Program
          </div>
          <Icon name="arrow-right" fontSize={20} className="text-Brand-700" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 px-4 md:px-8">
        <span className={css.title}>Leave</span>
        <Button variant="text" color="primary" customStyle="!p-0 flex flex-row gap-2 w-fit">
          <div className={`${css.bold} text-Error-700 underline`}>Leave the Contributor Program </div>
          <Icon name="arrow-right" fontSize={20} className="text-Error-700" />
        </Button>
      </div>
    </div>
  );
};
