export interface InvitationModalProps {
  open: boolean;
  handleClose: () => void;
  disputeInfo: { code: string; title?: string };
  onAccept: () => void;
  onDecline: () => void;
}
