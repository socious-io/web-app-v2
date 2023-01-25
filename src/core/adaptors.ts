import { SOCIAL_CAUSES } from './constants/SOCIAL_CAUSES';

export function socialCausesToCategoryAdaptor() {
  return Object.entries(SOCIAL_CAUSES).map(([, value]) => value);
}
