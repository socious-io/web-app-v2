import { flexRender } from '@tanstack/react-table';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { ToggleButton } from 'src/Nowruz/modules/general/components/toggleButton';

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
        Leave
      </Button>
      <Button variant="outlined" color="primary" customStyle="w-full md:w-fit" onClick={() => setOpenModal(false)}>
        Cancel
      </Button>
    </div>
  );
  return (
    <>
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
                  See all disputes
                </Button>
              </div>
            </div>
          ) : (
            <EmptyList />
          )}
        </div>

        {/* <div className="flex flex-col gap-4 px-4 md:px-8 ">
          <span className={css.title}>Contributor resources</span>
          <Button variant="text" color="primary" customStyle="!p-0 flex flex-row gap-2 w-fit">
            <div className={`${css.bold} text-Brand-700 underline text-start`}>
              Learn more about the Socious Contributor Program
            </div>
            <Icon name="arrow-right" fontSize={20} className="text-Brand-700" />
          </Button>
        </div> */}
        <div className="flex flex-col gap-4 px-4 md:px-8">
          <span className={css.title}>Leave</span>
          <Button
            variant="text"
            color="primary"
            customStyle="!p-0 flex flex-row gap-2 w-fit"
            onClick={() => setOpenModal(true)}
          >
            <div className={`${css.bold} text-Error-700 underline`}>Leave the Contributor Program </div>
            <Icon name="arrow-right" fontSize={20} className="text-Error-700" />
          </Button>
        </div>
      </div>
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title="Leave the Contributor Program"
        subTitle="Are you sure you want to opt out from the Socious Contributor Program?"
        footer={footerJsx}
        mobileFullHeight={false}
        mobileCentered
        headerDivider
        footerDivider={false}
        customStyle="md:max-w-[480px]"
      >
        <div className="px-4 py-5 md:p-6 text-Gray-light-mode-600 font-normal text-sm leading-5">
          <p>
            We value your contributions and would be sad to see you go! If you need a break, you might consider pausing
            your participation instead.
          </p>
          <p>By pausing your contributor status, you will:</p>
          <ul className="list-disc my-5 ml-6">
            <li>Temporarily stop receiving new task notifications</li>
            <li>Retain your contributor status</li>
            <li>Have the flexibility to resume your participation whenever you&apos;re ready</li>
          </ul>
          <p>If you still wish to opt out, please keep in mind that:</p>
          <ul className="list-disc mt-5 ml-6">
            <li>You will be removed from the Contributor Program and stop receiving all task notifications</li>
            <li>You will lose your contributor status</li>
            <li>You&apos;ll need to go through the opt-in process again if you decide to rejoin in the future</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};
