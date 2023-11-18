import { Divider, Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './avatarDropDown.module.scss';
import { AvatarDropDownProps } from './avatarDropDown.types';
import { IconListItem } from './iconListItem';
import { useAvatarDropDown } from './useVatarDropDown';
import { AvatarLabelGroup } from '../avatarLabelGroup';

export const AvatarDropDown: React.FC<AvatarDropDownProps> = (props) => {
  const {
    buttonHeight,
    createOrg = false,
    displayOtherAccounts = false,
    displaySetting = false,
    createOrgFunc,
  } = props;
  const { open, switchAccount, handleAvatarClick, selectedAccount, otherAccounts } = useAvatarDropDown();
  return (
    <div className={css.container}>
      <button className={`${buttonHeight ? `h-[${buttonHeight}]` : 'h-16'} ${css.button}`} onClick={handleAvatarClick}>
        <AvatarLabelGroup account={selectedAccount} />
        {!open && (
          <div className="justify-end cursor-pointer py-3 px-4">
            <Icon name="chevron-down" fontSize={20} color={variables.color_grey_700} />
          </div>
        )}
      </button>
      {open && (
        <div className={`w-full bg-Base-White rounded-default`}>
          <div className="w-full">
            <Divider />
          </div>
          <div className="w-full flex flex-col">
            {otherAccounts && (
              <>
                {displayOtherAccounts &&
                  otherAccounts.map((a) => (
                    <AvatarLabelGroup key={a.id} account={a} handleClick={() => switchAccount(a.id)} />
                  ))}
                {createOrg && (
                  <div className="flex px-4 py-[10px] gap-2" onClick={createOrgFunc}>
                    <Icon name="plus" fontSize={20} className="text-Brand-700" />
                    <Typography variant="subtitle2" className="text-Gray (light mode)-900">
                      Create an organization
                    </Typography>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="w-full">
            <Divider />
          </div>
          <div className="w-full flex flex-col py-1">
            {displaySetting && <IconListItem iconName="settings-01" label="Settings" />}
            <IconListItem iconName="help-circle" label="Support" />
          </div>
          <div className="w-full">
            <Divider />
          </div>
          <IconListItem iconName="log-out-01" label="Log out" />
        </div>
      )}
    </div>
  );
};
