import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { DisputesRes, InvitationsRes } from 'src/core/api';
import DisputesList from 'src/modules/Disputes/DisputesList';
import InvitationsList from 'src/modules/Disputes/InvitationsList';
export const useContributeCenter = () => {
  const { jurorDisputes, jurorInvitations } = useLoaderData() as {
    jurorDisputes: DisputesRes;
    jurorInvitations: InvitationsRes;
  };
  const { t } = useTranslation('decentdispute');
  const tabs = [
    { label: t('DecDispJurorStatusInvited'), content: <InvitationsList list={jurorInvitations} /> },
    { label: t('DecDispJurorStatusPending'), content: <DisputesList list={jurorDisputes} mode="juror" /> },
  ];

  return {
    tabs,
  };
};
