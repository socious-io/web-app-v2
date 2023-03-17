export const PROJECT_REMOTE_PREFERENCES = [
  { title: 'Onsite', value: 'ONSITE' },
  { title: 'Remote', value: 'REMOTE' },
  { title: 'Hybrid', value: 'HYBRID' },
];

export const PROJECT_REMOTE_PREFERENCES_V2 = [
  { label: 'Onsite', value: 'ONSITE' },
  { label: 'Remote', value: 'REMOTE' },
  { label: 'Hybrid', value: 'HYBRID' },
];

export function translateRemotePreferences(value: string) {
  const obj = PROJECT_REMOTE_PREFERENCES.find((item) => item.value === value);
  if (obj) {
    return obj.title;
  }
  console.warn('Could not translate remote_preferences');
  return '';
}
