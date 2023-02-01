import { Pagination } from "../../../../core/types";
import { Notifications } from "../../../organisms/notification-list/notification-list.types";

export type NotificationMobileProps = {
    list: Pagination<Notifications[]>;
   
}