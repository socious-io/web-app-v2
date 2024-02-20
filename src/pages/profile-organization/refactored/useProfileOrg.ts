import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { socialCausesToCategory } from 'src/core/adaptors';
import { CurrentIdentity, Organization } from 'src/core/api';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { ConnectStatus } from 'src/core/types';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { identities } from 'src/core/api';
import { getConnectStatus, hiringCall, sendRequestConnection } from './profileOrg.services';
import { Resolver } from './profileOrg.types';

export const useProfileOrg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resolver = useLoaderData() as Resolver;
  const [organization, setOrganization] = useState<Organization>(resolver.user);
  const socialCauses = socialCausesToCategory(resolver.user?.social_causes);
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const userIsLoggedIn = !!currentIdentity;
  const address = `${organization.city}, ${getCountryName(
    organization.country as keyof typeof COUNTRIES_DICT | undefined,
  )}`;
  const profileBelongToCurrentUser = currentIdentity?.id === organization.id;
  const [connectStatus, setConnectStatus] = useState<ConnectStatus | undefined>(undefined);
  const [message, setMessage] = useState('please connect to me');

  const [hiring, setHiring] = useState(organization.hiring);

  useEffect(() => {
    const getConnectionsStatus = async () => {
      const res = await getConnectStatus(organization.id);
      setConnectStatus(res?.connect?.status);
    };
    getConnectionsStatus();
  }, []);

  async function updateIdentityList() {
    dispatch(setIdentityList(await identities()));
  }
  useEffect(() => {
    updateIdentityList()
  }, []);

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }
  function navigateJobs() {
    navigate(`/profile/organizations/${resolver.user.shortname}/jobs`);
  }
  function onClose() {
    hapticsImpactLight();
    navigate('/jobs');
  }

  function navigateToEdit() {
    navigate('../edit');
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

  function updateOrganization(params: Organization) {
    setOrganization((prev) => {
      return {
        ...prev,
        bio: params.bio,
        name: params.name,
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
        website: params.website,
        mobile_country_code: params.mobile_country_code,
      };
    });
  }

  async function onHiring() {
    setHiring(!organization.hiring);
    organization.hiring = await hiringCall();
    setOrganization(organization);
  }

  return {
    onClose,
    organization,
    address,
    socialCauses,
    profileBelongToCurrentUser,
    navigateToEdit,
    onConnect,
    connectStatus,
    showMessageIcon,
    onMessage,
    updateOrganization,
    navigateJobs,
    hiring,
    onHiring,
    userIsLoggedIn,
  };
};
