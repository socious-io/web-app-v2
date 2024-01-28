export interface AlertMessageProps {
  theme: 'primary' | 'gray' | 'error' | 'warning' | 'success';
  iconName: string;
  title: string;
  subtitle: string;
  closeButton?: boolean;
  handleClost?: () => void;
  primaryButton?: boolean;
  primaryButtonLabel?: string;
  primaryButtonAction?: () => void;
  secondaryButton?: boolean;
  secondaryButtonLabel?: string;
  secondaryButtonAction?: () => void;
}
