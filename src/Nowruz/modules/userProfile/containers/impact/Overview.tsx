import type { FC } from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import { Impact } from '../../components/impact';

export type OverviewProps = {
  hours: Array<{ type: 'paid' | 'volunteered'; hours: number }>;
  points: number;
};

export const Overview: FC<OverviewProps> = ({ hours, points }) => {
  function calculateTotalHours(
    entries: Array<{ type: 'paid' | 'volunteered'; hours: number }>,
    type: 'paid' | 'volunteered',
  ): number {
    return entries?.filter((entry) => entry.type === type).reduce((total, entry) => total + entry.hours, 0);
  }

  // Calculate total paid hours
  const totalPaidHours = calculateTotalHours(hours, 'paid');

  // Calculate total volunteered hours
  const totalVolunteeredHours = calculateTotalHours(hours, 'volunteered');

  return (
    <div className="container py-6">
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg sm:row-span-2">
          <Impact point={points} myProfile={false} />
        </div>

        <div className="bg-white rounded-lg border border-solid p-6 border border-Gray-light-mode-200">
          <div className="flex flex-col items-start gap-4">
            <div className="rounded-lg border border-solid border-Gray-light-mode-200 p-2">
              <Icon fontSize={24} name="clock" className="text-Gray-light-mode-700" />
            </div>
            <p className="text-sm text-gray-600">Total hours contributed</p>
            <div className="flex flex-row items-end gap-1">
              <p className="text-3xl text-gray-600 font-bold">{totalPaidHours + totalVolunteeredHours}</p>
              <p className="text-sm text-gray-600">hrs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-solid p-6 border border-Gray-light-mode-200">
          <div className="flex flex-col items-start gap-4">
            <div className="rounded-lg border border-solid border-Gray-light-mode-200 p-2">
              <Icon fontSize={24} name="clock" className="text-Gray-light-mode-700" />
            </div>
            <p className="text-sm text-gray-600">Hours worked</p>
            <div className="flex flex-row items-end gap-1">
              <p className="text-3xl text-gray-600 font-bold">{totalPaidHours}</p>
              <p className="text-sm text-gray-600">hrs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-solid p-6 border border-Gray-light-mode-200">
          <div className="flex flex-col items-start gap-4">
            <div className="rounded-lg border border-solid border-Gray-light-mode-200 p-2">
              <Icon fontSize={24} name="clock" className="text-Gray-light-mode-700" />
            </div>
            <p className="text-sm text-gray-600">Hours volunteered</p>
            <div className="flex flex-row items-end gap-1">
              <p className="text-3xl text-gray-600 font-bold">{totalVolunteeredHours}</p>
              <p className="text-sm text-gray-600">hrs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
