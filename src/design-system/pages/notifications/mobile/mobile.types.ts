import { Notifications } from "../../../organisms/notification-list/Notification-list.types";

export type NotificationMobileProps = {
    list: Notifications[];
    onMorePageClick: () => void;
}