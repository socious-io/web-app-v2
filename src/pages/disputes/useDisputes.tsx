import { useLoaderData, useLocation } from 'react-router-dom';
import { DisputesRes } from 'src/core/api';
import { translate } from 'src/core/utils';
import DisputesList from 'src/modules/Disputes/DisputesList';

export const useDisputes = () => {
  const { hash } = useLocation();
  const { submittedDisputes, receivedDisputes } = useLoaderData() as {
    submittedDisputes: DisputesRes;
    receivedDisputes: DisputesRes;
  };
  const tabs = [
    { label: translate('dispute-submitted'), content: <DisputesList list={submittedDisputes} mode="submitted" /> },
    { label: translate('dispute-received'), content: <DisputesList list={receivedDisputes} mode="received" /> },
  ];
  const activeTabIndex = {
    '#submitted': 0,
    '#received': 1,
  };

  return { tabs, activeTabIndex: activeTabIndex[hash] || 0 };
};
