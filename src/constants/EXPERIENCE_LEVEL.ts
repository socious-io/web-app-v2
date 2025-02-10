import { translate } from 'src/core/utils';

export const EXPERIENCE_LEVEL = [
  { value: 0, title: translate('experience_level.no_experience') },
  { value: 1, title: translate('experience_level.entry') },
  { value: 2, title: translate('experience_level.intermediate') },
  { value: 3, title: translate('experience_level.expert') },
];

export const EXPERIENCE_LEVEL_V2 = [
  { value: 0, label: translate('experience_level.no_experience') },
  { value: 1, label: translate('experience_level.entry') },
  { value: 2, label: translate('experience_level.intermediate') },
  { value: 3, label: translate('experience_level.expert') },
];

export function translateExperienceLevel(value: number): string {
  if (EXPERIENCE_LEVEL_V2[value]) {
    return EXPERIENCE_LEVEL_V2[value].label;
  }
  return '';
}
