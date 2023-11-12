import { Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './avatarDropDown.module.scss';
import { AvatarDropDownProps } from './avatarDropDown.types';
import { AvatarLabelGroup } from '../avatarLabelGroup';

export const AvatarDropDown: React.FC<AvatarDropDownProps> = (props) => {
  const { accounts, buttonHeight } = props;
  const [open, setOpen] = useState(false);
  const selectedAccount = accounts.find((a) => a.selected) || accounts[0];
  const otherAccounts = accounts.filter((a) => a.id !== selectedAccount.id);
  return (
    <div className={css.container}>
      <button
        className={`${buttonHeight ? `h-[${buttonHeight}]` : 'h-16'} ${css.button}`}
        onClick={() => setOpen(!open)}
      >
        <AvatarLabelGroup
          img={selectedAccount.img}
          type={selectedAccount.type}
          name={selectedAccount.name}
          username={selectedAccount.username}
        />
        {!open && (
          <div className="justify-end cursor-pointer py-3 px-4">
            <Icon name="chevron-down" fontSize={20} color={variables.color_grey_700} />
          </div>
        )}
      </button>
      {open && (
        <div className={`w-full absolute ${buttonHeight ? `top-[${buttonHeight}]` : 'top-16'} bg-Base-White`}>
          <div className="w-full">
            <Divider />
          </div>
          <div className="w-full flex flex-col">
            {otherAccounts && (
              <>
                {otherAccounts.map((a) => (
                  <AvatarLabelGroup key={a.id} img={a.img} type={a.type} name={a.name} username={a.username} />
                ))}
                {selectedAccount.type === 'users' && (
                  <div className="flex px-4 py-[10px] gap-2">
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
            <div className="w-full flex py-[9px] px-[10px] gap-3">
              <Icon name="settings-01" fontSize={16} className="text-Gray (light mode)-700" />
              <Typography variant="subtitle1" className="text-Gray (light mode)-700">
                Settings
              </Typography>
            </div>
            <div className="w-full flex py-[9px] px-[10px] gap-3">
              <Icon name="help-circle" fontSize={16} className="text-Gray (light mode)-700" />
              <Typography variant="subtitle1" className="text-Gray (light mode)-700">
                Support
              </Typography>
            </div>
          </div>
          <div className="w-full">
            <Divider />
          </div>
          <div className="w-full flex py-[9px] px-[10px] gap-3">
            <Icon name="log-out-01" fontSize={16} className="text-Gray (light mode)-700" />
            <Typography variant="subtitle1" className="text-Gray (light mode)-700">
              Log out
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};
