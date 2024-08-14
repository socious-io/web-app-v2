import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { DisputesRes } from 'src/core/api';
import DisputesList from 'src/modules/Disputes/DisputesList';
export const useDisputes = () => {
  const { submittedDisputes, receivedDisputes } = useLoaderData() as {
    submittedDisputes: DisputesRes;
    receivedDisputes: DisputesRes;
  };
  const { t } = useTranslation('decentdispute');
  const tabs = [
    { label: t('DecDispSubmitted'), content: <DisputesList list={submittedDisputes} mode="submitted" /> },
    { label: t('DecDispReceived'), content: <DisputesList list={receivedDisputes} mode="received" /> },
  ];

  return { tabs };
};
