import { Typography } from '@mui/material';
import { Icon } from 'src/Nowruz/general/Icon';

import { LinkItemProps } from './linkItem.types';

export const LinkItem: React.FC<LinkItemProps> = (props) => {
  const { children, iconName, label, navigateFunc, badgeIcon, menuOpen, subMenuOpen } = props;

  return (
    <>
      <div className="w-full h-12 bg-Brand-700 hover:bg-Brand-600 px-3 py-2 rounded-sm flex gap-2">
        {iconName && <Icon name={iconName} color="white" fontSize={24} />}
        {menuOpen && (
          <>
            <Typography
              variant="h4"
              className="text-Brand-100 cursor-pointer hover:text-Base-White"
              onClick={navigateFunc}
            >
              {label}
            </Typography>
            {badgeIcon && menuOpen ? <div className=" mr-0 ml-auto">{badgeIcon}</div> : ''}
          </>
        )}
      </div>
      {menuOpen &&
        subMenuOpen &&
        children?.map((item) => (
          <div className="w-full h-10 pr-3 pl-11 py-2 rounded-sm bg-Brand-700 hover:bg-Brand-600 ">
            <Typography variant="h4" className="text-Brand-100 cursor-pointer" onClick={item.navigateFunc}>
              {item.label}
            </Typography>
          </div>
        ))}
    </>
  );
};
