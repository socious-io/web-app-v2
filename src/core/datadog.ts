import { config } from 'src/config';
import { datadogRum } from '@datadog/browser-rum';

export function init(version: string) {
  if (config.datadogClientToken && config.datadogAppId) {
    datadogRum.init({
      applicationId: config.datadogAppId,
      clientToken: config.datadogClientToken,
      site: 'ap1.datadoghq.com',
      service: 'webapp',
      env: config.env,
      version,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
    });
  }
}

export function addAction(name: string, context?: object) {
  if (config.datadogClientToken && config.datadogAppId) return;
  datadogRum.addAction(name, context);
}

export function setUser(user: { id: string; email: string; name: string }) {
  if (config.datadogClientToken && config.datadogAppId) return;
  datadogRum.setUser(user);
}
