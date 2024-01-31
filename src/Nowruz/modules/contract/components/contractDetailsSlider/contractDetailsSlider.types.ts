import { ReactNode } from 'react';
import { Offer } from 'src/core/api';
export interface ContractDetailsSliderProps {
  offer: Offer;
  displayPrimaryButton: boolean;
  primaryButtonLabel?: string;
  primaryButtonAction?: () => void;
  displaySecondaryButton: boolean;
  secondaryButtonLabel?: string;
  secondaryButtonAction?: () => void;
  displayMessage: boolean;
  messageComponent?: ReactNode;
}
