import { MenuItem, MenuList } from '@mui/material';
import React, { useEffect, useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';

import css from './connectionTabThreeDotButton.module.scss';
import { MenuItemType, ConnectionTabThreeDotsButtonProps } from './connectionTabthreeDotsButton.types';

export const ConnectionTabThreeDotsButton: React.FC<ConnectionTabThreeDotsButtonProps> = ({
  follower,
  following,
  handleFollow,
  handleUnfollow,
  handleRemoveConnection,
  name,
  handleBlock,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openBlockAlert, setOpenBlockAlert] = useState(false);
  const getConectionStatus = () => {
    const items: MenuItemType[] = [];

    if (following) items.push({ iconName: 'x-circle', title: 'Unfollow', onClick: handleUnfollow });
    else items.push({ iconName: 'plus-circle', title: 'Follow', onClick: handleFollow });
    items.push({ iconName: 'user-x-01', title: 'Remove connection', onClick: handleRemoveConnection });
    // items.push({ iconName: 'share-01', title: 'Share profile' });
    items.push({ iconName: 'archive', title: 'Block', onClick: () => setOpenBlockAlert(true) });
    setMenuItems(items);
  };

  useEffect(() => {
    getConectionStatus();
  }, [follower, following]);

  return (
    <>
      <div className="relative">
        <IconButton
          size="small"
          iconName="dots-vertical"
          iconColor={variables.color_grey_700}
          iconSize={20}
          customStyle="w-9 h-10 !border !border-solid !border-Gray-light-mode-300"
          onClick={() => setOpenMenu(!openMenu)}
        />
        {openMenu && (
          <MenuList autoFocusItem className={css.menuList} onMouseLeave={() => setOpenMenu(false)}>
            {menuItems.map(item => (
              <MenuItem key={item.title} className={css.menuItem} onClick={item.onClick}>
                <Icon name={item.iconName} fontSize={16} className="text-Gray-light-mode-700" />
                <span>{item.title}</span>
              </MenuItem>
            ))}
          </MenuList>
        )}
      </div>
      <AlertModal
        open={openBlockAlert}
        onClose={() => setOpenBlockAlert(false)}
        title="Block"
        message={`Are you sure you want to block ${name}. You’ll no longer be connected as well.`}
        customIcon={<FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="primary"
        submitButtonLabel="Block"
        onSubmit={handleBlock}
      />
    </>
  );
};
