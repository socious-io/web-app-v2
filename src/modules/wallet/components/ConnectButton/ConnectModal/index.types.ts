export interface ConnectModalProps {
  open: boolean;
  handleClose: () => void;
  symbol: string;
  address: string;
  formattedBalance: string;
  handleDisconnect: () => void;
  handleCopy: () => void;
  footer?: React.ReactNode;
}
