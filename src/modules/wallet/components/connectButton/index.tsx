import React from 'react';

import css from './connectButton.module.scss';

interface ConnectButtonProps {
  handleClick: () => void;
}
export const ConnectButton: React.FC<ConnectButtonProps> = ({ handleClick }) => {
  return (
    <button className={css.btn} onClick={handleClick}>
      <img src="/icons/nowruz/wallet.svg" alt="" />
      WalletConnect
    </button>
  );
};
