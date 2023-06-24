import { useEffect, useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { ConnectStatus, IdentityReq } from 'src/core/types';
import { ProfileReq, Resolver } from './profile-organization.types';
import { getConnectStatus, sendRequestConnection } from './profile-organization.services';
import { PostUpdateProfileResp } from 'src/core/endpoints/index.types';

export const useProfileOrganizationShared = () => {
  const navigate = useNavigate();
  const resolver = useMatch().data as Resolver;
  const [organization, setOrganization] = useState<ProfileReq>(resolver.user);
  const socialCauses = socialCausesToCategory(resolver.user.social_causes);
  const skills = skillsToCategory(resolver.user.skills);
  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const address = `${organization.city}, ${getCountryName(
    organization.country as keyof typeof COUNTRIES_DICT | undefined
  )}`;
  const profileBelongToCurrentUser = currentIdentity?.id === organization.id;
  const [connectStatus, setConnectStatus] = useState<ConnectStatus | undefined>(undefined);
  const [message, setMessage] = useState('please connect to me');

  useEffect(() => {
    const getConnectionsStatus = async () => {
      const res = await getConnectStatus(organization.id);
      setConnectStatus(res?.connect?.status);
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
    const connectId = organization.proofspace_connect_id ? organization.proofspace_connect_id : null;
    navigate({ to: `/achievements?proofspace_connect_id=${connectId}` });
  }

  function navigateToEdit() {
    navigate({ to: '../edit' });
  }

  async function onConnect(id: string) {
    const result = await sendRequestConnection(id, message);
    setConnectStatus(result?.status);
  }

  function showMessageIcon() {
    if (currentIdentity?.type === 'organizations') {
      return true;
    } else {
      if (connectStatus === 'CONNECTED') {
        return true;
      }
      return false;
    }
  }

  function onMessage(value: string) {
    setMessage(value || 'please connect to me');
  }

  function updateOrganization(params: PostUpdateProfileResp) {
    console.log({ params });
    setOrganization((prev) => {
      return {
        ...prev,
        bio: params.bio,
        city: params.city,
        country: params.country,
        culture: params.culture,
        social_causes: params.social_causes,
        email: params.email,
        mission: params.mission,
        type: params.type,
        cover_image: params.cover_image,
        image: params.image,
        phone: params.phone,
        mobile_country_code: params.mobile_country_code,
      };
    });
  }
  return {
    onClose,
    organization,
    address,
    badges: resolver.badges,
    socialCauses,
    skills,
    onAchievementClick,
    profileBelongToCurrentUser,
    navigateToEdit,
    onConnect,
    connectStatus,
    showMessageIcon,
    onMessage,
    updateOrganization,
  };
};
