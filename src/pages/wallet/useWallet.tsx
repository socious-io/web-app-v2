import { Assets } from 'src/modules/wallet/components/assets';
import { MobileTransactions } from 'src/modules/wallet/components/transactions/mobileTransactions';

export const useWallet = () => {
  const tabs = [
    { label: 'Assets', content: <Assets /> },
    { label: 'History', content: <MobileTransactions /> },
  ];

  return { tabs };
};
