export interface ConnectionTabThreeDotsButtonProps {
  following: boolean;
  handleFollow: () => void;
  follower: boolean;
  handleUnfollow: () => void;
  handleRemoveConnection: () => void;
  handleBlock: () => void;
}

export interface MenuItemType {
  iconName: string;
  title: string;
  onClick?: () => void;
}
