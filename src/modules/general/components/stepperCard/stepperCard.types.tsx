import { ReactNode } from 'react';

export interface ActionButton {
  display: boolean;
  label: string;
  disabled: boolean;
  action: () => void;
}

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
  verified?: 'verified' | 'unverified' | 'pending';
  verifyButton?: ActionButton;
  claimButton?: ActionButton;
}
