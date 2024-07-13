import { useLoaderData } from 'react-router-dom';
import { DisputesRes } from 'src/core/api';
import DisputesList from 'src/modules/Disputes/DisputesList';

export const useDisputes = () => {
  const { submittedDisputes, receivedDisputes } = useLoaderData() as {
    submittedDisputes: DisputesRes;
    receivedDisputes: DisputesRes;
  };
  const tabs = [
    { label: 'Submitted', content: <DisputesList list={submittedDisputes} mode="submitted" /> },
    { label: 'Received', content: <DisputesList list={receivedDisputes} mode="received" /> },
  ];

  return { tabs };
};
