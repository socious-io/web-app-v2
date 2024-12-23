import React from 'react';
import { Icon } from 'src/modules/general/components/Icon';

import css from './connectButton.module.scss';

interface ConnectButtonProps {
  handleClick: () => void;
}
export const ConnectButton: React.FC<ConnectButtonProps> = ({ handleClick }) => {
  return (
    <button type="button" className={css.btn} onClick={handleClick}>
      <Icon name="wallet-connect-01" fontSize={20} color="#0099FF" />
      WalletConnect
    </button>
  );
};
