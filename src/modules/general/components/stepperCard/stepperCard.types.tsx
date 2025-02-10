import { ReactNode } from 'react';

export interface ActionButton {
  display: boolean;
  label: string;
  disabled: boolean;
  action: () => void;
}
export type Verified = 'verified' | 'unverified' | 'pending';
export interface StepperCardProps {
  iconName?: string;
  customIcon?: ReactNode;
  img?: string;
  title?: string;
  subtitle?: string;
  supprtingText?: string;
  editable?: boolean;
  editFunc?: () => void;
  deletable?: boolean;
  deleteFunc?: () => void;
  description?: string;
  handleEdit?: () => void;
  handleDelete?: () => void;
  DisplayVerificationStatus?: boolean;
  verified?: Verified;
  verifyButton?: ActionButton;
  claimButton?: ActionButton;
}
