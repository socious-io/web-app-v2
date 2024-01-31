import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { NotificationSettings } from 'src/constants/constants';
import { NotificationsSettings, NotificationType, updateNotificationSettings } from 'src/core/api';

import { Payload } from './settings.types';

export const useSettingsShared = () => {
  const { settings } = useLoaderData() as NotificationsSettings;
  const mapRequestToStatic = NotificationSettings.map((notif) => ({
    ...notif,
    ...settings?.find((setting) => setting.type === notif.type),
  }));
  const settingsList = settings?.length ? mapRequestToStatic : NotificationSettings;
  const [generateSettings, setGenerateSettings] = useState(settingsList);
  const [payload, setPayload] = useState<Payload>({} as Payload);
  const notAllow = generateSettings.every((setting) => !setting.in_app && !setting.email && !setting.push);
  const [allChecked, setAllChekced] = useState(!notAllow);
  const settingsGuide = 'https://www.notion.so/socious/Notification-Settings-32a002269adc44d4984955bd77626cb6';

  function onChange(checked: boolean, type: NotificationType, key: string) {
    setPayload({ ...payload, [type]: { ...payload[type], [key]: checked } });
  }

  async function onConfirm(payload: Payload) {
    const payloadRes =
      payload &&
      Object.entries(payload).map(([key, obj]) => {
        const defaultValueOfKey = generateSettings.find((setting) => setting.type === key);
        return {
          type: key,
          in_app: obj.in_app !== undefined ? obj.in_app : (defaultValueOfKey?.in_app as boolean),
          email: obj.email !== undefined ? obj.email : (defaultValueOfKey?.email as boolean),
          push: obj.push !== undefined ? obj.push : (defaultValueOfKey?.push as boolean),
        };
      });
    const keys = new Set(payloadRes.map((d) => d.type));
    const merged = [...generateSettings.filter((setting) => !keys.has(setting.type)), ...payloadRes];
    updateNotificationSettings({ settings: merged } as NotificationsSettings);
  }

  function onAllowNotifications(checked: boolean) {
    setAllChekced(checked);
    const result = generateSettings.map((setting) => ({
      ...setting,
      in_app: checked,
      email: checked,
      push: checked,
    }));
    setGenerateSettings(result);
    updateNotificationSettings({ settings: result });
  }

  return {
    generateSettings,
    payload,
    onChange,
    onConfirm,
    onAllowNotifications,
    allowedNotifications: allChecked,
    settingsGuide,
  };
};
