import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { checkVerification, ImpactPoints, Organization, requestVerification, User } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';

export const useDashboard = () => {
  const { profileData, impactPointHistory } = useLoaderData() as {
    profileData: User | Organization;
    impactPointHistory: ImpactPoints;
  };
  const { name, type, usernameVal } = getIdentityMeta(profileData);

  const profileUrl =
    type === 'users' ? `/profile/users/${usernameVal}/view` : `/profile/organizations/${usernameVal}/view`;

  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const verified = type === 'users' ? (profileData as User).identity_verified : (profileData as Organization).verified;

  const [connectUrl, setConnectUrl] = useState('');

  const verifyAction = async () => {
    const vc = await requestVerification();
    setConnectUrl(vc.connection_url);
    setOpenVerifyModal(true);
  };
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

  return {
    verified,
    type,
    verifyAction,
    profileData,
    profileUrl,
    hoursVolunteered,
    hoursWorked,
    openVerifyModal,
    setOpenVerifyModal,
    connectUrl,
    name,
  };
};
