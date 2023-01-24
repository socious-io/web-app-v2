import { MakeGenerics } from '@tanstack/react-location';
import { MessagesReq, ParticipantsReq } from '../../../../core/types';

export type MessageLoader = MakeGenerics<{
  LoaderData: {
    messages: MessagesReq[];
    participants: ParticipantsReq[];
  };
}>;
