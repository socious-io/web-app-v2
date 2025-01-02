import { translate } from 'src/core/utils';

export const ORGANIZATION_TYPE = [
  { id: 'SOCIAL', value: 'SOCIAL', label: translate('organization_type.social_business') },
  { id: 'NONPROFIT', value: 'NONPROFIT', label: translate('organization_type.non_profit') },
  { id: 'COOP', value: 'COOP', label: translate('organization_type.social_cooperative') },
  { id: 'IIF', value: 'IIF', label: translate('organization_type.impact_investing') },
  { id: 'PUBLIC', value: 'PUBLIC', label: translate('organization_type.public_institution') },
  { id: 'INTERGOV', value: 'INTERGOV', label: translate('organization_type.intergovernmental') },
  { id: 'DEPARTMENT', value: 'DEPARTMENT', label: translate('organization_type.impact_department') },
  { id: 'OTHER', value: 'OTHER', label: translate('organization_type.other') },
];
