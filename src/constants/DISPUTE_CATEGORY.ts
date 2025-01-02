import { translate } from 'src/core/utils';

export const DISPUTE_CATEGORY = [
  {
    value: 'SCOPE_AND_CONTRACT_DISPUTES_ISSUES',
    label: translate('dispute-category.scope-and-contract-disputes-issues'),
  },
  {
    value: 'INCOMPLETE_OR_UNSATISFACTORY_WORK',
    label: translate('dispute-category.incomplete-or-unsatisfactory-work'),
  },
  { value: 'COMMUNICATION_PROBLEMS', label: translate('dispute-category.communication-problems') },
  { value: 'SCOPE_AND_CONTRACT_DISPUTES', label: translate('dispute-category.scope-and-contract-disputes') },
  {
    value: 'INTELLECTUAL_PROPERTY_AND_CONFIDENTIALITY',
    label: translate('dispute-category.intellectual-property-and-confidentiality'),
  },
  { value: 'PROFESSIONALISM_AND_CONDUCT', label: translate('dispute-category.professionalism-and-conduct') },
  { value: 'CANCELLATION_AND_REFUNDS', label: translate('dispute-category.cancellation-and-refunds') },
  { value: 'OTHERS', label: translate('dispute-category.others') },
];
