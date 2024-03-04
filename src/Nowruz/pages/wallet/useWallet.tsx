import { Assets } from 'src/Nowruz/modules/wallet/components/assets';
import { MobileTransactions } from 'src/Nowruz/modules/wallet/components/transactions/mobileTransactions';

export const useWallet = () => {
  const tabs = [
    { label: 'Assets', content: <Assets /> },
    { label: 'History', content: <MobileTransactions /> },
  ];

  return { tabs };
};
