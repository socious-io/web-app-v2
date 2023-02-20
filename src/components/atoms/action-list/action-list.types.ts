export type ActionListProps = {
    list: ActionObj[];
}

export type ActionObj = {
    id: string;
    label: string;
    iconName: string;
    like?: number;
    isLiked?: boolean;
    type: 'like' | 'comment'
    onClick?: (item: ActionObj) => void;
}