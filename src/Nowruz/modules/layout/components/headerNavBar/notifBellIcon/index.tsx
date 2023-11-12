import { Icon } from 'src/Nowruz/general/Icon';

export interface NotifBellIconProps {
  unread: boolean;
}
const NotifBellIcon = ({ unread = false }) => {
  return (
    <div className="h-10 w-10 relative flex items-center justify-center hover:bg-Gray-light-mode-100 rounded-sm transition duration-200 ease-linear">
      <Icon name="bell-01" className="text-Gray-light-mode-500" fontSize={20} />
      {unread && (
        <div className="absolute top-0 right-0 w-full h-full block hover:hidden ">
          <div className="absolute top-[10px] right-[10px] h-2 w-2 rounded-2xl bg-Error-500  " />
        </div>
      )}
    </div>
  );
};

export default NotifBellIcon;
