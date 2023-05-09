import { useMatch, useNavigate } from '@tanstack/react-location';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { ProfileReq } from './profile-organization.types';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { useSelector } from 'react-redux';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';

export const useProfileOrganizationShared = () => {
  const navigate = useNavigate();
  const { user, badges } = useMatch().data as { user: ProfileReq; badges: { badges: unknown[] } };
  const socialCauses = socialCausesToCategory(user.social_causes);
  const skills = skillsToCategory(user.skills);

  const currentIdentity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const profileBelongToCurrentUser = currentIdentity?.id === user.id;

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

  return {
    onClose,
    user,
    badges,
    socialCauses,
    skills,
    onAchievementClick,
    profileBelongToCurrentUser,
    navigateToEdit,
  };
};
