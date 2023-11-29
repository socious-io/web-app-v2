import { Typography } from '@mui/material';
import { Icon } from 'src/Nowruz/general/Icon';

import { LinkItemProps } from './linkItem.types';

export const LinkItem: React.FC<LinkItemProps> = (props) => {
  const { children, iconName, label, navigateFunc, badgeIcon, menuOpen, subMenuOpen } = props;

  return (
    <>
      <div className="w-full h-10 md:h-12 bg-Base-White hover:bg-Gray-light-mode-50 md:bg-Brand-700 md:hover:bg-Brand-600 px-3 py-2 rounded-sm flex gap-2">
        {iconName && <Icon name={iconName} fontSize={24} className="text-Gray-light-mode-500 md:text-Base-White" />}
        {menuOpen && (
          <>
            <Typography
              variant="h4"
              className="text-Gray-light-mode-700 hover:text-Base-Black md:text-Brand-100  md:hover:text-Base-White cursor-pointer"
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
          <div
            key={item.label}
            className="w-full h-10 pr-3 pl-11 py-2 rounded-sm bg-Base-White hover:bg-Gray-light-mode-50 md:bg-Brand-700 md:hover:bg-Brand-600"
          >
            <Typography
              variant="h4"
              className="text-Gray-light-mode-700 hover:text-Base-Black md:text-Brand-100  md:hover:text-Base-White cursor-pointer"
              onClick={item.navigateFunc}
            >
              {item.label}
            </Typography>
          </div>
        ))}
    </>
  );
};
