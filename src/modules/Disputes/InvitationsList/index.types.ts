import { InvitationsRes } from 'src/core/api';

export interface InvitationsListProps {
  list: InvitationsRes;
}

export type DisputeInfo = {
  code: string;
  invitationId?: string;
  disputeId?: string;
  title?: string;
} | null;
