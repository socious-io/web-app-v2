import { SemanticContractStatus } from 'src/core/adaptors';
import { StatusProps } from 'src/modules/general/components/Status/index.types';

export const CONTRACT_STATUS: Record<SemanticContractStatus, Omit<StatusProps, 'label'>> = {
  'Offer received': {
    theme: 'warning',
    icon: 'dot',
  },
  'Offer sent': {
    theme: 'secondary',
    icon: 'arrow-up',
  },
  'Awaiting confirmation': {
    theme: 'warning',
    icon: 'clock',
  },
  'Payment required': {
    theme: 'warning',
    icon: 'alert-circle',
  },
  Ongoing: {
    theme: 'success',
    icon: 'dot',
  },
  Completed: {
    theme: 'success',
    icon: 'check-circle',
  },
  Canceled: {
    theme: 'secondary',
  },
  Withdrawn: {
    theme: 'secondary',
  },
};
