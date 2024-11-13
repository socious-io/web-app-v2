import { UserProfile, OrganizationProfile } from 'src/core/api';

export interface ShareProfileProps {
  open: boolean;
  handleClose: () => void;
  identity: UserProfile | OrganizationProfile;
}
