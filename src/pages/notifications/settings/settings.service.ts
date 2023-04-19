import { get } from 'src/core/http';

export async function getSettingsItems() {
  return get('notifications/settings').then(({ data }) => data);
}
