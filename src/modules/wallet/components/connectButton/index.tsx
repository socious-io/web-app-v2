import { ConnectButton as RKButton } from '@rainbow-me/rainbowkit';
import React from 'react';

// import { Icon } from 'src/modules/general/components/Icon';
import css from './connectButton.module.scss';

export const ConnectButton: React.FC = () => {
  // TODO: fix buttn style need to overied rainbowkit button style
  return (
    <div className={css.btn}>
      <RKButton label="Connect Wallet" />
    </div>
  );
};
