import { MenuList } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'src/Nowruz/general/Icon';
import { AvatarDropDown } from 'src/Nowruz/modules/general/components/avatarDropDown';

import { LinksContainerProps } from './linksContainer.types';
import { useLinksContainer } from './useLinksContainer';
import { LinkItem } from '../linkItem/LinkItem';

export const LinksContainer: React.FC<LinksContainerProps> = ({ open }) => {
  const { filteredMenu, userIsLoggedIn } = useLinksContainer();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-start items-center w-full h-fit pt-8 gap-6">
      <div className="w-full h-fit py-0 pl-6 pr-5">
        <img
          className="hidden md:block"
          src={open ? '/icons/nowruz/logo-white.svg' : '/icons/nowruz/logoMark-white.svg'}
          alt=""
        />
        <img className="block md:hidden" src="/icons/nowruz/logo-primary.svg" alt="" />
      </div>
      {userIsLoggedIn && (
        <div className="md:hidden w-full h-fit px-4">
          <AvatarDropDown displayOtherAccounts />
        </div>
      )}

      <MenuList autoFocusItem className="w-full flex flex-col gap-2 px-4 py-0 items-center self-stretch">
        {filteredMenu.map((item) =>
          item.children ? (
            <LinkItem
              key={item.label}
              label={item.label}
              navigateFunc={() => navigate(item.route)}
              iconName={item.iconName}
              children={item.children.map((ch) => {
                return {
                  label: ch.label,
                  navigateFunc: () => {
                    navigate(ch.route);
                  },
                };
              })}
              menuOpen={open}
              subMenuOpen={subMenuOpen}
              badgeIcon={
                subMenuOpen ? (
                  <Icon
                    name="chevron-up"
                    className="text-Brand-300 !cursor-pointer"
                    fontSize={20}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  />
                ) : (
                  <Icon
                    name="chevron-down"
                    className="text-Brand-300 !cursor-pointer"
                    fontSize={20}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  />
                )
              }
            />
          ) : (
            <LinkItem
              key={item.label}
              label={item.label}
              navigateFunc={() => {
                navigate(item.route);
              }}
              iconName={item.iconName}
              menuOpen={open}
              badgeIcon={item.badgeIcon}
            />
          ),
        )}
      </MenuList>
    </div>
  );
};
