import { Divider, Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './avatarDropDown.module.scss';
import { AvatarDropDownProps } from './avatarDropDown.types';
import { useAvatarDropDown } from './useVatarDropDown';
import { AvatarLabelGroup } from '../avatarLabelGroup';

export const AvatarDropDown: React.FC<AvatarDropDownProps> = (props) => {
  const { buttonHeight, displayOtherAccounts = false, createAccountFunc } = props;
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
        <div className={`w-full max-h-96 bg-Base-White rounded-default overflow-y-auto`}>
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

                <div className="flex px-4 py-[10px] gap-2" onClick={createAccountFunc}>
                  <Icon name="plus" fontSize={20} className="text-Brand-700" />
                  <Typography variant="subtitle2" className="text-Brand-700">
                    {selectedAccount.type === 'users' ? 'Create an organization' : 'Create a talent profile'}
                  </Typography>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
