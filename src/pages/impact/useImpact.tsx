import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Badges, ImpactPoints, Organization, User } from 'src/core/api';
import { Overview } from 'src/modules/userProfile/containers/impact/Overview';
import { RootState } from 'src/store';

export const useImpact = () => {
  const [hours, setHours] = useState<Array<{ type: 'paid' | 'volunteered'; hours: number }>>();
  const identity = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  });
  const { impactPointHistory } = useLoaderData() as { badges: Badges; impactPointHistory: ImpactPoints };

  useEffect(() => {
    let totalHours: { type: 'paid' | 'volunteered'; hours: number }[] = [];
    if (impactPointHistory) {
      totalHours = impactPointHistory.items
        .filter(item => !!item.offer)
        .map(item => {
          //FIXME: ask Ehsan
          if ((item.offer.currency && ['USD', 'YEN'].includes(item.offer.currency)) || item.offer.currency) {
            return { type: 'paid', hours: item.offer.total_hours || 0 };
          } else {
            return { type: 'volunteered', hours: item.offer.total_hours || 0 };
          }
        });

      setHours(totalHours);
    }
  }, [impactPointHistory]);

  const tabs = [
    { label: 'Overview', content: <Overview hours={hours ?? []} points={identity?.impact_points ?? 0} /> },
    // { label: 'Achievements', content: <div /> },
    // { label: 'History', content: <div /> },
  ];

  return {
    data: { tabs },
    operations: {},
  };
};
