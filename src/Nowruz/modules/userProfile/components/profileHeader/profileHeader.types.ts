import { ConnectStatus, Media } from 'src/core/api';

export interface ProfileHeaderProps {
  coverImage?: Media;
  profileImage?: Media;
  name?: string;
  username?: string;
  myProfile: boolean;
  isLoggedIn: boolean;
  connectStatus: ConnectStatus | undefined;
}
