import { Icon } from 'src/Nowruz/general/Icon';
import { NotificationItem } from 'src/Nowruz/modules/layout/components/NotificationItem';

import css from './notifications.module.scss';
import { NotificationProps } from './notifications.type';
import { useNotifications } from './useNotifications';

export const Notifications: React.FC<NotificationProps> = ({ handleClose, list }) => {
  const { mapTypeToRoute } = useNotifications();
  return (
    <div className={`h-full w-full md:w-[400px] ${css.container}`}>
      <div className={css.header}>
        <h1 className={css.title}>Notifications</h1>
        <button className={css.closeBtn} aria-label="close">
          <Icon fontSize={20} name="x-close" className="text-Gray-light-mode-500" onClick={handleClose} />
        </button>
      </div>

      <div className="p-6 w-full h-full overflow-y-auto flex flex-col gap-8">
        {list?.map((item) => (
          <NotificationItem
            key={item.id}
            item={item}
            onClick={() =>
              mapTypeToRoute(
                item.data.type,
                item.data.orgin ? item.data.orgin.id || '' : '',
                item.data.type === 'OFFER' ? item.data.refId : item.data.parentId,
                item.data.identity.type,
                item.data.identity.meta.username || item.data.identity.meta.shortname,
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
