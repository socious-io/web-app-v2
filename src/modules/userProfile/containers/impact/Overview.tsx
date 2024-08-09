import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Impact } from '../../components/impact';
import { HoursSpentCard } from '../../components/impact/hoursSpentCard';
export type OverviewProps = {
  hours: Array<{ type: 'paid' | 'volunteered'; hours: number }>;
  points: number;
};

export const Overview: FC<OverviewProps> = ({ hours, points }) => {
  function calculateTotalHours(
    entries: Array<{ type: 'paid' | 'volunteered'; hours: number }>,
    type: 'paid' | 'volunteered',
  ): number {
    return entries?.filter(entry => entry.type === type).reduce((total, entry) => total + entry.hours, 0);
  }

  // Calculate total paid hours
  const totalPaidHours = calculateTotalHours(hours, 'paid');

  // Calculate total volunteered hours
  const totalVolunteeredHours = calculateTotalHours(hours, 'volunteered');
  const { t } = useTranslation('impact');
  return (
    <div className="container py-6">
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg sm:row-span-2">
          <Impact point={points} myProfile={false} />
        </div>

        <HoursSpentCard
          cardText={t('heading.total_hours_contributed')}
          hours={totalPaidHours + totalVolunteeredHours}
        />
        <HoursSpentCard cardText={t('heading.hours_worked')} hours={totalPaidHours} />
        <HoursSpentCard cardText={t('heading.hours_volunteered')} hours={totalVolunteeredHours} />
      </div>
    </div>
  );
};
