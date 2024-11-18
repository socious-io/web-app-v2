import { translate } from 'src/core/utils';
import { Assets } from 'src/modules/wallet/components/assets';
import { MobileTransactions } from 'src/modules/wallet/components/transactions/mobileTransactions';

export const useWallet = () => {
  const tabs = [
    { label: translate('pay-assets'), content: <Assets /> },
    { label: translate('pay-history'), content: <MobileTransactions /> },
  ];

  return { tabs };
};
