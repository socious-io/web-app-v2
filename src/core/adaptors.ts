import { skills } from './api';
import { CategoriesResp, Cities } from './types';
import { DropdownItem } from '../components/atoms/dropdown-v2/dropdown.types';
import { SOCIAL_CAUSES } from '../constants/SOCIAL_CAUSES';

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

export async function skillsToCategoryAdaptor() {
  const skillList = await skills({ limit: 500 });
  return skillList.items.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
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
      return { value: name, label: name };
    });
  } catch {
    return [];
  }
}
