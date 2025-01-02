import { translate } from 'src/core/utils';

export const PROJECT_REMOTE_PREFERENCES = [
  { title: translate('remote-preferences.onsite'), value: 'ONSITE' },
  { title: translate('remote-preferences.remote'), value: 'REMOTE' },
  { title: translate('remote-preferences.hybrid'), value: 'HYBRID' },
];

export const PROJECT_REMOTE_PREFERENCES_V2 = [
  { label: translate('remote-preferences.onsite'), value: 'ONSITE' },
  { label: translate('remote-preferences.remote'), value: 'REMOTE' },
  { label: translate('remote-preferences.hybrid'), value: 'HYBRID' },
];
export function translateRemotePreferences(value: string) {
  const obj = PROJECT_REMOTE_PREFERENCES.find(item => item.value === value);
  if (obj) {
    return obj.title;
  }
  console.warn('Could not translate remote_preferences');
  return '';
}
