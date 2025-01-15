import { Wallet } from '@rainbow-me/rainbowkit';
import { createConnector } from 'wagmi';
import { injected } from 'wagmi/connectors';

import { CIP30ToEIP1193Provider } from './cip-30';

export interface MyWalletOptions {
  projectId: string;
}

export const laceWallet = ({ projectId }: MyWalletOptions): Wallet => ({
  id: 'lace.wallet',
  name: 'Lace',
  iconUrl: '/lace.svg',
  iconBackground: '#0000',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=lace',
    ios: 'https://apps.apple.com/us/app/lace',
    chrome: 'https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk?hl=en',
    qrCode: 'https://lace.io',
  },
  mobile: {
    getUri: (uri: string) => uri,
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://lace.io',
      steps: [
        {
          description: 'We recommend putting My Wallet on your home screen for faster access to your wallet.',
          step: 'install',
          title: 'Open the My Wallet app',
        },
        {
          description: 'After you scan, a connection prompt will appear for you to connect your wallet.',
          step: 'scan',
          title: 'Tap the scan button',
        },
      ],
    },
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://lace.io',
      steps: [
        {
          description: 'We recommend pinning My Wallet to your taskbar for quicker access to your wallet.',
          step: 'install',
          title: 'Install the My Wallet extension',
        },
        {
          description:
            'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
          step: 'create',
          title: 'Create or Import a Wallet',
        },
        {
          description: 'Once you set up your wallet, click below to refresh the browser and load up the extension.',
          step: 'refresh',
          title: 'Refresh your browser',
        },
      ],
    },
  },
  createConnector: createInjectedConnector(new CIP30ToEIP1193Provider(window.cardano?.lace)),
});

function createInjectedConnector(provider) {
  return walletDetails => {
    const injectedConfig = provider
      ? {
          target: () => ({
            id: walletDetails.rkDetails.id,
            name: walletDetails.rkDetails.name,
            provider,
          }),
        }
      : {};
    return createConnector(config => ({
      // Spread the injectedConfig object, which may be empty or contain the target function
      ...injected(injectedConfig)(config),
      ...walletDetails,
    }));
  };
}
