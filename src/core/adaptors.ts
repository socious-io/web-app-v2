import { DropdownItem } from '@atoms/dropdown-v2/dropdown.types';
import { SKILLS } from '@constants/SKILLS';
import { SOCIAL_CAUSES } from '@constants/SOCIAL_CAUSES';
import { CategoriesResp, Cities } from './types';

export function socialCausesToCategoryAdaptor() {
  return Object.entries(SOCIAL_CAUSES).map(([, value]) => value);
}

export function socialCausesToDropdownAdaptor() {
  return Object.entries(SOCIAL_CAUSES)
    .map(([, value]) => {
      return { title: value.label, value: value.value };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
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

export function jobCategoriesToDropdown(categories: CategoriesResp['categories']): DropdownItem[] {
  return categories.map((item) => {
    return {
      id: item.id,
      label: item.name,
      value: item.id,
    };
  });
}

export function citiesToCategories(cities: Cities[]): DropdownItem[] {
  return cities.map((city) => {
    return {
      id: city.id,
      label: city.name,
      value: city.name,
      helperText: city.region_name,
    };
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
