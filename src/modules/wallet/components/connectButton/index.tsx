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
  const cardano = window?.cardano;
  console.log('window.cardano: ' + JSON.stringify(Object.getOwnPropertyNames(cardano)));
  // this is according to CIP-30
  const lace = window?.cardano?.lace;
  if (typeof lace === 'undefined') {
    return; //TODO(Elaine): placeholder? Grayed out? I think desaturated with tooltip would be good
  }
  console.log('lace properties: ' + JSON.stringify(Object.getOwnPropertyNames(lace)));
  console.log('lace.isEnabled', lace.isEnabled());
  console.log('lace.enable', lace.enable);
  // lace.enable([]); // empty extensions list for now
  const onClick = async () => {
    const api = await lace.enable();
    //FIXME(Elaine): I know this looks like I'm writing Haskell in javascript
    //FIXME(Elaine): deduplicate with useWeb3()
    //FIXME(Elaine): select actual wallet if multiple
    const usedAddresses = new Set(await api.getUsedAddresses());
    const unusedAddresses = new Set(await api.getUnusedAddresses());
    const allAddresses = Array.from(usedAddresses.union(unusedAddresses));

    console.log('allAddresses: ', allAddresses);

    // FIXME(Elaine): probably we can get rid of the handleClick entirely
    handleClick();
  };

  const laceIcon = lace.icon;
  return (
    <button className={css.btn} onClick={onClick}>
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
