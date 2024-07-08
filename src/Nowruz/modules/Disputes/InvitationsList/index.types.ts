import { InvitationsPaginateRes } from 'src/core/api';

export interface InvitationsListProps {
  list: InvitationsPaginateRes;
}

export type DisputeInfo = {
  code: string;
  invitationId?: string;
  disputeId?: string;
  title?: string;
} | null;
