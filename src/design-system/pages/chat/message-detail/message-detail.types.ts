import { MakeGenerics } from '@tanstack/react-location';
import { IdentityReq, MessagesReq, Pagination, ParticipantsReq } from '../../../../core/types';

export type MessageLoader = MakeGenerics<{
  LoaderData: {
    messages: Pagination<MessagesReq[]>;
    participants: Pagination<ParticipantsReq[]>;
  };
}>;

export type OnPostMessageParams = {
  id: string;
  identity: IdentityReq;
  text: string;
};
