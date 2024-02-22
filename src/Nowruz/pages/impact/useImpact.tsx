import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Badges, ImpactPoints, Organization, User } from 'src/core/api';
import { Overview } from 'src/Nowruz/modules/userProfile/containers/impact/Overview';
import { RootState } from 'src/store';

export const useImpact = () => {
  const [hours, setHours] = useState<Array<{ type: 'paid' | 'volunteered'; hours: number }>>();
  const identity = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  });
  const { impactPointHistory } = useLoaderData() as { badges: Badges; impactPointHistory: ImpactPoints };

  useEffect(() => {
    let totalHours: { type: 'paid' | 'volunteered'; hours: number }[] = [];
    if (impactPointHistory) {
      totalHours = impactPointHistory.items
        .filter((item) => item.offer !== null)
        .map((item) => {
          if (item.offer) {
            if (['FIAT', 'CRYPTO'].includes(item.offer.payment_mode)) {
              return { type: 'paid', hours: item.offer.total_hours };
            } else {
              return { type: 'volunteered', hours: item.offer.total_hours };
            }
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
