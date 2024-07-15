export interface ConnectionTabThreeDotsButtonProps {
  following: boolean;
  handleFollow: () => void;
  follower: boolean;
  handleUnfollow: () => void;
  handleRemoveConnection: () => void;
  handleBlock: () => void;
  name: string;
}

export interface MenuItemType {
  iconName: string;
  title: string;
  onClick?: () => void;
}
