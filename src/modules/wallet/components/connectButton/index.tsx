import React from 'react';
import { Icon } from 'src/modules/general/components/Icon';

import css from './connectButton.module.scss';

interface ConnectButtonProps {
  handleClick: () => void;
}
export const ConnectButton: React.FC<ConnectButtonProps> = ({ handleClick }) => {
  return (
    <button className={css.btn} onClick={handleClick}>
      <Icon name="wallet-connect-01" fontSize={20} color="#0099FF" />
      WalletConnect
    </button>
  );
};

interface LaceButtonProps {
  handleClick: () => void;
}
export const LaceButton: React.FC<LaceButtonProps> = ({ handleClick }) => {
  console.log('window.cardano' + window.cardano.toJSON());
  const lace = window?.cardano?.lace;
  if (typeof lace === 'undefined') {
    return; //TODO(Elaine): placeholder? Grayed out? I think desaturated with tooltip would be good
  }

  const laceIcon = lace.icon;
  return (
    <button className={css.btn} onClick={handleClick}>
      <img src={laceIcon} alt="" />
      LaceConnect
    </button>
  );
};

interface ConnectButtonsProps {
  handleWalletConnect: () => void;
  handleLaceConnect: () => void;
  //TODO(Elaine): We should build out some UI for more wallets in general, or a different connector
}

export const ConnectButtons: React.FC<ConnectButtonsProps> = ({ handleWalletConnect, handleLaceConnect }) => {
  return (
    //TODO(Elaine): styling
    <div style={{ display: 'flex' }}>
      <ConnectButton handleClick={handleWalletConnect} />
      <LaceButton handleClick={handleLaceConnect} />
    </div>
  );
};
