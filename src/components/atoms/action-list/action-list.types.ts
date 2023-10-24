export type ActionListProps = {
  list: ActionObj[];
};

export type ActionObj = {
  id?: string;
  label: string;
  iconName: string;
  like?: number;
  isLiked?: boolean;
  type: string;
  onClick?: () => void;
  onLike?: () => void;
  onRemoveLike?: () => void;
};
