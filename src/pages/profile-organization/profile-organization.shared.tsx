import { useEffect, useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { ConnectStatus, IdentityReq } from 'src/core/types';
import { Resolver } from './profile-organization.types';
import { getConnectStatus, sendRequestConnection } from './profile-organization.services';

export const useProfileOrganizationShared = () => {
  const navigate = useNavigate();
  const { user, badges } = useMatch().data as Resolver;
  const socialCauses = socialCausesToCategory(user.social_causes);
  const skills = skillsToCategory(user.skills);
  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const address = `${user.city}, ${getCountryName(user.country as keyof typeof COUNTRIES_DICT | undefined)}`;
  const profileBelongToCurrentUser = currentIdentity?.id === user.id;
  const [connectStatus, setConnectStatus] = useState<ConnectStatus | undefined>(undefined);
  const [message, setMessage] = useState('please connect to me');

  useEffect(() => {
    const getConnectionsStatus = async () => {
      const res = await getConnectStatus(currentIdentity?.id as string, user.id);
      setConnectStatus(res?.items[0].status);
    };
    getConnectionsStatus();
  }, []);

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  function onClose() {
    hapticsImpactLight();
    navigate({ to: '/jobs' });
  }

  function onAchievementClick() {
    hapticsImpactLight();
    const connectId = user.proofspace_connect_id ? user.proofspace_connect_id : null;
    navigate({ to: `/achievements?proofspace_connect_id=${connectId}` });
  }

  function navigateToEdit() {
    navigate({ to: '../edit' });
  }

  async function onConnect(id: string) {
    const result = await sendRequestConnection(id, message);
    setConnectStatus(result?.status);
  }

  function onMessage(value: string) {
    setMessage(value || 'please connect to me');
  }

  return {
    onClose,
    user,
    address,
    badges,
    socialCauses,
    skills,
    onAchievementClick,
    profileBelongToCurrentUser,
    navigateToEdit,
    onConnect,
    connectStatus,
    onMessage,
  };
};
