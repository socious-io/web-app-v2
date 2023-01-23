import css from './mobile.module.scss';
import { NotificationMobileProps } from './mobile.types';
import {NotificationList} from '../../../organisms/notification-list/notification-list';

export const Mobile = ({ list , onMorePageClick }: NotificationMobileProps): JSX.Element => {
    return (
        <div className={css.container}>
            <NotificationList onMorePageClick={onMorePageClick} list={list}/>
        </div>
    );
};
