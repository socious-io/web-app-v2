import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { isTouchDevice } from 'src/core/device-type-detector';
import { endpoint } from 'src/core/endpoints';
import { PostUpdateProfileResp } from 'src/core/endpoints/index.types';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { ConnectStatus, IdentityReq } from 'src/core/types';
import { RootState } from 'src/store';

import {
  getConnectStatus,
  getUserMissions,
  sendRequestConnection,
  openToWorkCall,
  openToVolunteerCall,
} from './profileUser.services';
import { ProfileReq, Resolver } from './profileUser.types';

export const useProfileUser = () => {
  const navigate = {};
  const resolver = useMatch().data as Resolver;
  const [user, setUser] = useState<ProfileReq>(resolver.user);
  const socialCauses = socialCausesToCategory(user.social_causes);
  const avatarImage = user.avatar?.url ? user.avatar?.url : user.image?.url;
  const skills = skillsToCategory(user.skills);
  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const address = `${user.city}, ${getCountryName(user.country as keyof typeof COUNTRIES_DICT | undefined)}`;
  const profileBelongToCurrentUser = currentIdentity?.id === user.id;
  const userIsLoggedIn = !!currentIdentity;
  const [following, setFollowing] = useState<boolean>();
  const [connectStatus, setConnectStatus] = useState<ConnectStatus | undefined>(undefined);
  const [message, setMessage] = useState('please connect to me');
  const [openToWork, setOpenToWork] = useState(user.open_to_work);
  const [openToVolunteer, setOpenToVolunteer] = useState(user.open_to_volunteer);
  const [editOpen, setEditOpen] = useState(false);

  const [missions, setMissons] = useState<
    {
      organizationName: string;
      role: string;
      dateFrom: string;
      dateTo: string;
      location: string;
      organizationImage: string;
    }[]
  >([]);

  useEffect(() => {
    const getConnectionsStatus = async () => {
      const res = await getConnectStatus(user.id);
      setConnectStatus(res?.connect?.status);
      const missionsRes = await getUserMissions(user.id);
      setMissons(
        missionsRes.items.map((mission) => ({
          organizationName: mission.organization.name,
          organizationImage: mission.organization.image,
          role: mission.project.title,
          dateFrom: new Date(mission.project.created_at).toLocaleDateString('en-US'),
          dateTo: new Date(mission.project.updated_at).toLocaleDateString('en-US'),
          location: COUNTRIES_DICT[mission.project.country as keyof typeof COUNTRIES_DICT],
        })),
      );
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

  function updateUser(params: PostUpdateProfileResp) {
    setUser((prev) => ({
      ...prev,
      avatar: params.avatar,
      first_name: params.first_name,
      last_name: params.last_name,
      username: params.username,
      bio: params.bio,
      social_causes: params.social_causes,
      city: params.city,
      country: params.country,
      cover_image: params.cover_image,
      mission: params.mission,
      skills: params.skills,
    }));
  }

  async function onOpenToWork() {
    setOpenToWork(!user.open_to_work);
    user.open_to_work = await openToWorkCall();
    setUser(user);
  }

  async function onOpenToVolunteer() {
    setOpenToVolunteer(!user.open_to_volunteer);
    user.open_to_volunteer = await openToVolunteerCall();
    setUser(user);
  }

  function onClose() {
    hapticsImpactLight();
    navigate({ to: '/jobs' });
  }

  async function follow(id: string) {
    return endpoint.post.follows['{identity_id}'](id).then(() => setFollowing(true));
  }

  async function unfollow(id: string) {
    return endpoint.post.follows['{identity_id}/unfollow'](id).then(() => setFollowing(false));
  }

  function gotToDesktopAchievement() {
    const connectId = user.proofspace_connect_id ? user.proofspace_connect_id : null;
    navigate({ to: `/achievements/d?proofspace_connect_id=${connectId}` });
  }

  function gotToMobileAchievement() {
    hapticsImpactLight();
    const connectId = user.proofspace_connect_id ? user.proofspace_connect_id : null;
    navigate({ to: `/achievements/m?proofspace_connect_id=${connectId}` });
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

  function onEdit() {
    if (isTouchDevice()) {
      navigate({ to: '../edit' });
    } else {
      setEditOpen(true);
    }
  }

  return {
    user,
    setUser,
    updateUser,
    address,
    badges: resolver.badges || { badges: [] },
    socialCauses,
    avatarImage,
    skills,
    currentIdentity,
    profileBelongToCurrentUser,
    openToWork,
    onOpenToWork,
    openToVolunteer,
    onOpenToVolunteer,
    onClose,
    gotToDesktopAchievement,
    gotToMobileAchievement,
    onEdit,
    follow,
    unfollow,
    onConnect,
    connectStatus,
    showMessageIcon,
    onMessage,
    missions,
    editOpen,
    setEditOpen,
    userIsLoggedIn,
  };
};
