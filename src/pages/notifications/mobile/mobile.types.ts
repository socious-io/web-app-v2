import { Pagination } from "../../../core/types";
import { Notifications } from "../../../components/organisms/notification-list/notification-list.types";

export type NotificationMobileProps = {
    list: Pagination<Notifications[]>;
   
}