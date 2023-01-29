export type ActionListProps = {
    list: ActionObj[];
}

export type ActionObj = {
    label: string;
    iconName: string;
    like?: number;
    isLiked?:boolean;
    onClick?: () => void;
}