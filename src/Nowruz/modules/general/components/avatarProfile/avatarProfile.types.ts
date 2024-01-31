export interface AvatarProfileProps {
  size: 'small' | 'medium' | 'large';
  imgUrl?: string;
  type?: 'users' | 'organizations';
  text?: string;
  verified: boolean;
  handleClick?: () => void;
}
