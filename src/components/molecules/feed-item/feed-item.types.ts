import { ActionObj } from 'src/components/atoms/action-list/action-list.types';

export type FeedItemProps = {
  onMoreClick?: () => void;
  onAvatarClick?: () => void;
  id?: string;
  imgAvatar: string;
  date: string;
  img: string;
  categories?: { value: string | number; label: string }[];
  text: string;
  name: string;
  actionList: ActionObj[];
  type: 'organizations' | 'users';
  lineLimit?: number | 'none';
};
