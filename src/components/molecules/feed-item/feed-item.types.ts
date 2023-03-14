export type FeedItemProps = {
  onMoreClick?: () => void;
  onAvatarClick?: () => void;
  id?: string;
  imgAvatar: string;
  date: string;
  img: string;
  categories?: { value: string; label: string }[];
  text: string;
  name: string;
  actionList: { label: string; iconName: string }[];
  type: 'organizations' | 'users';
  lineLimit?: number | 'none';
};
