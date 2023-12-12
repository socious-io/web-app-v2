import { Typography } from '@mui/material';
import { Icon } from 'src/Nowruz/general/Icon';

export interface IconListItemProps {
  iconName?: string;
  label: string;
  onClick?: () => void;
}
export const IconListItem: React.FC<IconListItemProps> = ({ iconName, label, onClick }) => {
  return (
    <div className="w-full h-[50px] flex py-[13px] px-[10px] gap-3 cursor-pointer" onClick={onClick}>
      {iconName && <Icon name={iconName} fontSize={16} className="text-Gray (light mode)-700" />}
      <Typography variant="subtitle1" className="text-Gray (light mode)-700">
        {label}
      </Typography>
    </div>
  );
};
