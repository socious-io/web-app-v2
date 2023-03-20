export const EXPERIENCE_LEVEL = [
  { value: 0, title: 'No experience' },
  { value: 1, title: 'Entry' },
  { value: 2, title: 'Intermediate' },
  { value: 3, title: 'Expert' },
];

export const EXPERIENCE_LEVEL_V2 = [
  { value: 0, label: 'No experience' },
  { value: 1, label: 'Entry' },
  { value: 2, label: 'Intermediate' },
  { value: 3, label: 'Expert' },
];

export function translateExperienceLevel(value: number): string {
  if (EXPERIENCE_LEVEL_V2[value]) {
    return EXPERIENCE_LEVEL_V2[value].label;
  }
  return '';
}
