export type ActionListProps = {
    list: ActionObj[];
}

export type ActionObj = {
    label: string;
    iconName: string;
    onClick?: () => void;
}