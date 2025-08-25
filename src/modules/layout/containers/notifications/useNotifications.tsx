import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, Notification } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { getIdentityMeta } from 'src/core/utils';
import { useIconDropDown } from 'src/modules/general/components/iconDropDown/useIconDropDown';
import { RootState } from 'src/store';

export const useNotifications = (handleClose: () => void) => {
  const { switchAccount } = useIconDropDown();
  const navigate = useNavigate();
  const identities = useSelector<RootState, CurrentIdentity[]>(state => {
    return state.identity.entities;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const { usernameVal } = getIdentityMeta(currentIdentity);

  const generateLink = (item: Notification) => {
    const mapRoute = {
      DISPUTE_INITIATED: {
        hasSubText: true,
        linkButton: { label: 'View Details', href: `/disputes/${item.ref_id}#received` },
      },
      DISPUTE_NEW_RESPONSE: {
        hasSubText: true,
        linkButton: { label: 'View Response', href: `/disputes/${item.ref_id}` },
      },
      DISPUTE_JUROR_CONTRIBUTION_INVITED: {
        hasSubText: true,
        linkButton: { label: 'View Details', href: `/${usernameVal}/contribute/center` },
        identity: { name: 'Socious Team', avatar: '/images/logo/logo.webp' },
      },
      REACH_10K_IMPACT_POINT: {
        hasSubText: true,
        linkButton: { label: 'View Details', href: `/${usernameVal}/contribute` },
        identity: { name: 'Socious Team', avatar: '/images/logo/logo.webp' },
      },
      DISPUTE_JUROR_SELECTION_COMPLETED_TO_JURORS: {
        hasSubText: true,
        linkButton: { label: 'View Details', href: `/${usernameVal}/contribute` },
        identity: { name: 'Socious Team', avatar: '/images/logo/logo.webp' },
      },
      DISPUTE_CLOSED_TO_LOSER_PARTY: {
        hasSubText: true,
        linkButton: { label: 'View Details', href: `/disputes/${item.ref_id}` },
        identity: { name: 'Socious Team', avatar: '/images/logo/logo.webp' },
      },
      DISPUTE_JUROR_SELECTION_COMPLETED_TO_PARTIES: {
        hasSubText: true,
        linkButton: { label: 'View Details', href: `/disputes/${item.ref_id}` },
        identity: { name: 'Socious Team', avatar: '/images/logo/logo.webp' },
      },
    };
    const { linkButton, hasSubText, identity } = mapRoute[item.data.type] || {};
    return { linkButton, hasSubText, identity };
  };

  const mapTypeToRoute = (
    notifType: string,
    originIdentityId: string,
    notifRefId: string,
    notifIdentityType: string,
    username?: string,
  ) => {
    if (!originIdentityId || !identities.find(i => i.id === originIdentityId)) {
      dialog.alert({ message: 'This is an old notification' });
      return;
    }
    if (originIdentityId !== currentIdentity?.id) switchAccount(originIdentityId);
    let path = '';
    switch (notifType) {
      case 'FOLLOWED':
        path = `/profile/${notifIdentityType}/${username}/view`;
        break;
      case 'COMMENT_LIKE':
        path = '/feeds';
        break;
      case 'POST_LIKE':
        path = '/feeds';
        break;
      case 'CHAT':
        path = `/chats/contacts/${notifRefId}`;
        break;
      case 'SHARE_POST':
        path = '';
        break;
      case 'SHARE_PROJECT':
        path = '';
        break;
      case 'COMMENT':
        path = '/feeds';
        break;
      case 'APPLICATION':
        path = `/jobs/created/${notifRefId}`;
        break;
      case 'REJECT':
        path = `/jobs/${notifRefId}`;
        break;
      case 'OFFER':
      case 'APPROVED':
      case 'HIRED':
      case 'PROJECT_COMPLETE':
      case 'ASSIGNEE_CANCELED':
      case 'ASSIGNER_CANCELED':
      case 'ASSIGNER_CONFIRMED':
        path = `/contracts`;
        break;
      case 'CONNECT':
        path = `/profile/${notifIdentityType}/${username}/view`;
        break;
      case 'ACCEPT_CONNECT':
        path = `/profile/${notifIdentityType}/${username}/view`;
        break;
      case 'MEMBERED':
        path = ''; // FIXME: later for member feature
        break;
      case 'REFERRAL_JOINED':
      case 'REFERRAL_VERIFIED':
      case 'REFERRAL_HIRED':
      case 'REFERRAL_COMPLETED_JOB':
      case 'REFERRAL_CONFIRMED_JOB':
        return {};
      case 'EXPERIENCE_VERIFY_REQUEST':
      case 'EXPERIENCE_VERIFY_REJECTED':
      case 'EDUCATION_VERIFY_REQUEST':
      case 'EDUCATION_VERIFY_REJECTED':
        path = '/credentials#requested';
        break;
      case 'EXPERIENCE_VERIFY_APPROVED':
      case 'EDUCATION_VERIFY_APPROVED':
        path = '/credentials#issued';
        break;
      case 'DISPUTE_INITIATED':
      case 'DISPUTE_NEW_RESPONSE':
      case 'DISPUTE_JUROR_CONTRIBUTION_INVITED':
      case 'DISPUTE_JUROR_SELECTION_COMPLETED_TO_JURORS':
      case 'DISPUTE_CLOSED_TO_LOSER_PARTY':
      case 'REACH_10K_IMPACT_POINT':
        return;
      default:
        path = '';
        break;
    }
    handleClose();
    navigate(path);
  };

  return { mapTypeToRoute, generateLink };
};
