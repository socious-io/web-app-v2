import { MenuList } from '@mui/material';
import React from 'react';
import { AvatarDropDown } from 'src/modules/general/components/avatarDropDown';

import { LinksContainerProps } from './linksContainer.types';
import { useLinksContainer } from './useLinksContainer';
import { LinkItem } from '../linkItem/LinkItem';

export const LinksContainer: React.FC<LinksContainerProps> = ({ open, setOpen }) => {
  const { filteredMenu, userIsLoggedIn, onLogoClick, navigateFunction, onCreateAccount } = useLinksContainer(setOpen);

  return (
    <div className="flex flex-col justify-start items-center w-full h-fit pt-8 gap-6">
      <div className="w-full h-fit py-0 pl-6 pr-5 cursor-pointer" onClick={onLogoClick}>
        <img
          className="hidden md:block"
          src={open ? '/images/logo/logo-text-white.svg' : '/images/logo/logo-white.svg'}
          alt=""
        />
        <img className="block md:hidden" src="/images/logo/logo-text.svg" alt="" />
      </div>
      {userIsLoggedIn && (
        <div className="md:hidden w-full h-fit px-4">
          <AvatarDropDown displayOtherAccounts createAccountFunc={onCreateAccount} />
        </div>
      )}

      <MenuList autoFocusItem className="w-full flex flex-col gap-2 px-4 py-0 items-center self-stretch">
        {filteredMenu.map(item =>
          item.children ? (
            <LinkItem key={item.label} label={item.label} iconName={item.iconName} menuOpen={open}>
              {item.children.map(ch => {
                return {
                  label: ch.label,
                  navigateFunc: () => {
                    navigateFunction(ch.route);
                    setOpen(false);
                  },
                };
              })}
            </LinkItem>
          ) : (
            <LinkItem
              key={item.label}
              label={item.label}
              navigateFunc={() => {
                navigateFunction(item.route);
                setOpen(false);
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
