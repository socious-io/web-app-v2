export type FeedItemProps = {
    id?: string;
    imgAvatar: string;
    date: string;
    img: string;
    categories: { value: string; label: string }[];
    text: string;
    name: string;
    actionList: { label: string; iconName: string }[];
}