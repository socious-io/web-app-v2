import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { useIconDropDown } from 'src/Nowruz/modules/general/components/iconDropDown/useIconDropDown';
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
        path = `/feeds/${notifRefId}`;
        break;
      case 'POST_LIKE':
        path = `/feeds/${notifRefId}`;
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
        path = `/feeds/${notifRefId}`;
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
      // case 'ASSIGNEE_CANCELED':
      //   path = `/jobs/created/${notifRefId}/overview?tab=Offered`;
      //   break;
      // case 'ASSIGNER_CANCELED':
      //   path = `/jobs/applied/${notifRefId}?tab=Applied`;
      //   break;
      // case 'ASSIGNER_CONFIRMED':
      //   path = `/jobs/applied/${notifRefId}?tab=Hired`;
      //   break;
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
      default:
        path = '';
        break;
    }
    handleClose();
    navigate(path);
  };

  return { mapTypeToRoute };
};
