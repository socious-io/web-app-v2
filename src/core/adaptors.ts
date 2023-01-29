import { SKILLS } from './constants/SKILLS';
import { SOCIAL_CAUSES } from './constants/SOCIAL_CAUSES';

export function socialCausesToCategoryAdaptor() {
  return Object.entries(SOCIAL_CAUSES).map(([, value]) => value);
}

export function socialCausesToDropdownAdaptor() {
  return Object.entries(SOCIAL_CAUSES).map(([, value]) => {
    return { title: value.label, value: value.value };
  });
}

export function skillsToCategoryAdaptor() {
  return Object.entries(SKILLS).map(([key, value]) => {
    return { value: key, label: value };
  });
}

export function socialCausesToCategory(categories: string[] = []) {
  if (!categories) {
    return [];
  }
  return categories.map((cat) => {
    return SOCIAL_CAUSES[cat];
  });
}

export function skillsToCategory(skills: string[] = []) {
  try {
    return skills.map((name) => {
      return { value: name, label: SKILLS[name] };
    });
  } catch {
    return [];
  }
}
