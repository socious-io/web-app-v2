import { translate } from 'src/core/utils';

export const ORGANIZATION_SIZE = [
  { value: 'A', label: translate('organization_size.self_employed') },
  { value: 'B', label: translate('organization_size.1_10_employees') },
  { value: 'C', label: translate('organization_size.11_50_employees') },
  { value: 'D', label: translate('organization_size.51_200_employees') },
  { value: 'E', label: translate('organization_size.201_500_employees') },
  { value: 'F', label: translate('organization_size.501_1000_employees') },
  { value: 'G', label: translate('organization_size.1001_5000_employees') },
  { value: 'H', label: translate('organization_size.5001_10000_employees') },
  { value: 'I', label: translate('organization_size.10001_plus_employees') },
];
