import { useLoaderData } from 'react-router-dom';
import { DisputesRes, InvitationsRes } from 'src/core/api';
import DisputesList from 'src/Nowruz/modules/Disputes/DisputesList';
import InvitationsList from 'src/Nowruz/modules/Disputes/InvitationsList';

export const useContributeCenter = () => {
  const { jurorDisputes, jurorInvitations } = useLoaderData() as {
    jurorDisputes: DisputesRes;
    jurorInvitations: InvitationsRes;
  };

  const tabs = [
    { label: 'Invited', content: <InvitationsList list={jurorInvitations} /> },
    { label: 'Pending', content: <DisputesList list={jurorDisputes} mode="juror" /> },
  ];

  return {
    tabs,
  };
};
