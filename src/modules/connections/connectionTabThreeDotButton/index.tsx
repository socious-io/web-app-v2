import { MenuItem, MenuList } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { IconButton } from 'src/modules/general/components/iconButton';
import variables from 'src/styles/constants/_exports.module.scss';

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

    if (following) items.push({ iconName: 'x-circle', title: translate('connect-unfollow'), onClick: handleUnfollow });
    else items.push({ iconName: 'plus-circle', title: translate('connect-follow'), onClick: handleFollow });
    items.push({ iconName: 'user-x-01', title: translate('connect-remove'), onClick: handleRemoveConnection });
    // items.push({ iconName: 'share-01', title: 'Share profile' });
    items.push({ iconName: 'archive', title: translate('connect-block'), onClick: () => setOpenBlockAlert(true) });
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
        title={translate('connect-block')}
        message={translate('connect-block-alert', { name: name })}
        customIcon={<FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel={translate('connect-cancel')}
        submitButton={true}
        submitButtonTheme="primary"
        submitButtonLabel={translate('connect-block')}
        onSubmit={handleBlock}
      />
    </>
  );
};
