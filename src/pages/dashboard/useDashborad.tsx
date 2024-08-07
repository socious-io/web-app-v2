import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CurrentIdentity, ImpactPoints, Organization, User, UserMeta } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';

export const useDashboard = () => {
  const navigate = useNavigate();
  const { profileData, impactPointHistory } = useLoaderData() as {
    profileData: User | Organization;
    impactPointHistory: ImpactPoints;
  };

  const { name, type, usernameVal } = getIdentityMeta(profileData);

  const profileUrl =
    type === 'users' ? `/profile/users/${usernameVal}/view` : `/profile/organizations/${usernameVal}/view`;

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const verified =
    type === 'users' ? (currentIdentity?.meta as UserMeta).identity_verified : (profileData as Organization).verified;

  const event = type === 'users' ? (profileData as User).events?.[0] : null;
  const verificationStatus = currentIdentity?.verification_status;
  let hoursWorked = 0;
  let hoursVolunteered = 0;

  if (impactPointHistory) {
    impactPointHistory.items
      .filter(item => item.offer !== null)
      .forEach(item => {
        if (item.offer) {
          if ((item?.offer?.currency && ['USD', 'YEN'].includes(item?.offer?.currency)) || item.offer.currency)
            hoursWorked += item.offer.total_hours;
          else hoursVolunteered += item.offer.total_hours;
        }
      });
  }

  const navigateToSearchEvent = () => {
    if (!event) return;
    const filter = { events: [event.id] };
    localStorage.setItem('filter', JSON.stringify(filter));
    navigate(`/search?q=&type=users&page=1`);
  };

  return {
    verified,
    type,
    profileData,
    profileUrl,
    hoursVolunteered,
    hoursWorked,
    name,
    verificationStatus,
    event,
    navigateToSearchEvent,
  };
};
