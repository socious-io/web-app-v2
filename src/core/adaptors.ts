import { SKILLS } from './constants/SKILLS';
import { SOCIAL_CAUSES } from './constants/SOCIAL_CAUSES';

export function socialCausesToCategoryAdaptor() {
  return Object.entries(SOCIAL_CAUSES).map(([, value]) => value);
}

export function skillsToCategoryAdaptor() {
  return Object.entries(SKILLS).map(([key, value]) => {
    return { value: key, label: value };
  });
}
