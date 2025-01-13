import { Wallet, getWalletConnectConnector } from '@rainbow-me/rainbowkit';
import { bitgetWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConnector } from 'wagmi';
import { injected, coinbaseWallet } from 'wagmi/connectors';

import { CIP30ToEIP1193Provider } from './cip.convertor';

export interface MyWalletOptions {
  projectId: string;
}

const proxy = new Proxy(new CIP30ToEIP1193Provider(window.cardano?.lace), {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver);

    // Intercept and log `request` calls
    if (prop === 'request' && typeof value === 'function') {
      return async function (...args) {
        console.log(`[Ethereum Request] Method called:`, args);
        const result = await value.apply(this, args);
        console.log(`[Ethereum Request] Response received:`, result);

        // Log class details for the result (you can add more specific logic depending on the result type)
        if (result && typeof result === 'object') {
          console.log(`[Ethereum Request] Response class type:`, result.constructor.name);
        } else {
          console.log(`[Ethereum Request] Response is primitive value:`, result);
        }

        return result;
      };
    }

    // Intercept and log `send` calls (legacy support)
    if (prop === 'send' && typeof value === 'function') {
      return function (...args) {
        console.log(`[Ethereum Send] Method called:`, args);
        const result = value.apply(this, args);
        console.log(`[Ethereum Send] Response received:`, result);

        // Log class details for the result (you can add more specific logic depending on the result type)
        if (result && typeof result === 'object') {
          console.log(`[Ethereum Send] Response class type:`, result.constructor.name);
        } else {
          console.log(`[Ethereum Send] Response is primitive value:`, result);
        }

        return result;
      };
    }

    return value;
  },
});

export const laceWallet = ({ projectId }: MyWalletOptions): Wallet => ({
  id: 'lace.wallet',
  name: 'Lace',
  iconUrl: '/lace.svg',
  iconBackground: '#0000',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=my.wallet',
    ios: 'https://apps.apple.com/us/app/my-wallet',
    chrome: 'https://chrome.google.com/webstore/detail/my-wallet',
    qrCode: 'https://my-wallet/qr',
  },
  mobile: {
    getUri: (uri: string) => uri,
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://my-wallet/learn-more',
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
      learnMoreUrl: 'https://my-wallet/learn-more',
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
  createConnector: createInjectedConnector(proxy),
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
